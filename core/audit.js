export async function logAuditEvent(eventType, details, db) {
    const timestamp = new Date().toISOString();
    await db.put(`audit-${timestamp}`, { eventType, details }, { cas });
  }
  
  export async function getAuditLogs() {
    const logs = [];
    for await (const entry of db.createReadStream({ gte: 'audit-', lte: 'audit-\uffff' })) {
      logs.push(entry);
    }
    return logs;
  }
  