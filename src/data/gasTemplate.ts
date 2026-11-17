export const GAS_CODE_TEMPLATE = `/**
 * 2027 跨領域 54 週個人讀書進度儀表板 - Google Apps Script 雙向同步後端
 * 自動管理三個工作表：Tasks | WeeklyMeta | BooksSummary
 */

var SHEET_CONFIG = {
  Tasks: ['taskId', 'week', 'phase', 'subject', 'title', 'completed', 'updatedAt'],
  WeeklyMeta: ['week', 'dateRange', 'endoCount', 'endoTarget', 'note', 'updatedAt'],
  BooksSummary: ['bookId', 'title', 'category', 'isRecommended', 'targetWeeks', 'progressPercent', 'updatedAt']
};

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEET_CONFIG).forEach(function(sheetName) {
    var headers = SHEET_CONFIG[sheetName];
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#EDEAE2')
        .setFontColor('#33363A');
    } else if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
    }
  });
  return ss;
}

function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function readTasksMap(sheet) {
  var map = {};
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return map;
  var values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var taskId = String(row[0] || '').trim();
    if (!taskId) continue;
    map[taskId] = {
      taskId: taskId,
      week: Number(row[1]) || 0,
      phase: Number(row[2]) || 1,
      subject: String(row[3] || ''),
      title: String(row[4] || ''),
      completed: row[5] === true || String(row[5]).toUpperCase() === 'TRUE',
      updatedAt: Number(row[6]) || 0
    };
  }
  return map;
}

function readWeeklyMetaMap(sheet) {
  var map = {};
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return map;
  var values = sheet.getRange(2, 1, lastRow - 1, 6).getValues();
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var week = Number(row[0]);
    if (!week) continue;
    map[week] = {
      week: week,
      dateRange: String(row[1] || ''),
      endoCount: Number(row[2]) || 0,
      endoTarget: Number(row[3]) || 7,
      note: String(row[4] || ''),
      updatedAt: Number(row[5]) || 0
    };
  }
  return map;
}

function writeSheetRows(sheet, headers, rows) {
  var maxRows = sheet.getMaxRows();
  if (maxRows > 1) {
    sheet.getRange(2, 1, maxRows - 1, headers.length).clearContent();
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function doGet(e) {
  try {
    var ss = setupSheets();
    var tasksMap = readTasksMap(ss.getSheetByName('Tasks'));
    var metaMap = readWeeklyMetaMap(ss.getSheetByName('WeeklyMeta'));

    var tasksList = Object.keys(tasksMap).map(function(k) {
      return {
        taskId: tasksMap[k].taskId,
        completed: tasksMap[k].completed,
        updatedAt: tasksMap[k].updatedAt
      };
    });

    var metaList = Object.keys(metaMap).map(function(k) {
      return {
        week: metaMap[k].week,
        endoCount: metaMap[k].endoCount,
        endoTarget: metaMap[k].endoTarget,
        note: metaMap[k].note,
        updatedAt: metaMap[k].updatedAt
      };
    });

    return createJsonResponse({
      ok: true,
      serverTime: Date.now(),
      message: '已讀取試算表最新資料',
      tasks: tasksList,
      weeklyMeta: metaList
    });
  } catch (err) {
    return createJsonResponse({
      ok: false,
      serverTime: Date.now(),
      message: String(err)
    });
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var ss = setupSheets();
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);

    var tasksSheet = ss.getSheetByName('Tasks');
    var metaSheet = ss.getSheetByName('WeeklyMeta');
    var booksSheet = ss.getSheetByName('BooksSummary');

    var tasksMap = readTasksMap(tasksSheet);
    var metaMap = readWeeklyMetaMap(metaSheet);

    // 依據 updatedAt 時間戳記合併 Tasks（保留較新者）
    if (Array.isArray(payload.tasks) && payload.tasks.length > 0) {
      payload.tasks.forEach(function(item) {
        if (!item || !item.taskId) return;
        var existing = tasksMap[item.taskId];
        var incomingTs = Number(item.updatedAt) || 0;
        var existingTs = existing ? Number(existing.updatedAt) || 0 : -1;
        if (!existing || incomingTs >= existingTs) {
          tasksMap[item.taskId] = {
            taskId: String(item.taskId),
            week: Number(item.week) || 0,
            phase: Number(item.phase) || 1,
            subject: String(item.subject || ''),
            title: String(item.title || ''),
            completed: Boolean(item.completed),
            updatedAt: incomingTs
          };
        }
      });

      var taskKeys = Object.keys(tasksMap).sort(function(a, b) {
        return tasksMap[a].week - tasksMap[b].week || a.localeCompare(b);
      });
      var taskRows = taskKeys.map(function(k) {
        var t = tasksMap[k];
        return [t.taskId, t.week, t.phase, t.subject, t.title, t.completed, t.updatedAt];
      });
      writeSheetRows(tasksSheet, SHEET_CONFIG.Tasks, taskRows);
    }

    // 依據 updatedAt 時間戳記合併 WeeklyMeta（保留較新者）
    if (Array.isArray(payload.weeklyMeta) && payload.weeklyMeta.length > 0) {
      payload.weeklyMeta.forEach(function(item) {
        if (!item || !item.week) return;
        var w = Number(item.week);
        var existing = metaMap[w];
        var incomingTs = Number(item.updatedAt) || 0;
        var existingTs = existing ? Number(existing.updatedAt) || 0 : -1;
        if (!existing || incomingTs >= existingTs) {
          metaMap[w] = {
            week: w,
            dateRange: String(item.dateRange || ''),
            endoCount: Number(item.endoCount) || 0,
            endoTarget: Number(item.endoTarget) || 7,
            note: String(item.note || ''),
            updatedAt: incomingTs
          };
        }
      });

      var metaWeeks = Object.keys(metaMap).map(Number).sort(function(a, b) { return a - b; });
      var metaRows = metaWeeks.map(function(w) {
        var m = metaMap[w];
        return [m.week, m.dateRange, m.endoCount, m.endoTarget, m.note, m.updatedAt];
      });
      writeSheetRows(metaSheet, SHEET_CONFIG.WeeklyMeta, metaRows);
    }

    // 更新 BooksSummary 進度摘要表
    if (Array.isArray(payload.booksSummary) && payload.booksSummary.length > 0) {
      var bookRows = payload.booksSummary.map(function(b) {
        return [
          String(b.bookId || ''),
          String(b.title || ''),
          String(b.category || ''),
          Boolean(b.isRecommended),
          String(b.targetWeeks || ''),
          Number(b.progressPercent) || 0,
          Number(b.updatedAt) || Date.now()
        ];
      });
      writeSheetRows(booksSheet, SHEET_CONFIG.BooksSummary, bookRows);
    }

    var mergedTasks = Object.keys(tasksMap).map(function(k) {
      return {
        taskId: tasksMap[k].taskId,
        completed: tasksMap[k].completed,
        updatedAt: tasksMap[k].updatedAt
      };
    });

    var mergedMeta = Object.keys(metaMap).map(function(k) {
      return {
        week: metaMap[k].week,
        endoCount: metaMap[k].endoCount,
        endoTarget: metaMap[k].endoTarget,
        note: metaMap[k].note,
        updatedAt: metaMap[k].updatedAt
      };
    });

    return createJsonResponse({
      ok: true,
      serverTime: Date.now(),
      message: '試算表同步成功',
      tasks: mergedTasks,
      weeklyMeta: mergedMeta
    });
  } catch (err) {
    return createJsonResponse({
      ok: false,
      serverTime: Date.now(),
      message: String(err)
    });
  } finally {
    lock.releaseLock();
  }
}
`;
