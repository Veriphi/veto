const si = require('systeminformation');

type SystemInformation = { cpuPercentage: Promise<void>, memUsed: Promise<void>, memTotal: Promise<void>, diskData: Promise<void> }

export default async function getSystemInfo(): Promise<SystemInformation> {
  const cpuData = await si.currentLoad();
  const memData = await si.mem()
  const diskData = await si.fsSize()
  return {
    cpuPercentage: cpuData.currentload,
    memUsed: memData.active,
    memTotal: memData.total,
    diskData: diskData,
  }
}

/* ADD THIS TO THE HOOK ASSOCIATED WITH DISK DATA
var hello = 0
diskData.forEach((element: { size: number; }) => {
  hello += element.size
})

*/