document.addEventListener('DOMContentLoaded', function() {

  // Update Waktu
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('jam').textContent = timeString;
  }
  setInterval(updateTime, 1000); // Update setiap 1 detik
  updateTime(); // Panggil sekali saat halaman dimuat

  // Update Tanggal
  function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateString = `${day}-${month}-${year}`;
    document.getElementById('tanggal').textContent = dateString;
  }
  updateDate(); // Panggil sekali saat halaman dimuat

  // Update Baterai
  function updateBatteryStatus(battery) {
    const batteryLevel = Math.round(battery.level * 100); // Konversi ke persentase
    const isCharging = battery.charging ? " (Charging)" : " (Not Charging)";
    document.getElementById('baterai').textContent = `${batteryLevel}%${isCharging}`;
  }

  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      // Update status baterai saat pertama kali dimuat
      updateBatteryStatus(battery);

      // Update status baterai saat level berubah
      battery.addEventListener('levelchange', function() {
        updateBatteryStatus(battery);
      });

      // Update status baterai saat status pengisian berubah
      battery.addEventListener('chargingchange', function() {
        updateBatteryStatus(battery);
      });
    });
  } else {
    document.getElementById('baterai').textContent = "Battery API not supported";
  }
  
  async function getIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json(); // Perbaiki penulisan await
    document.getElementById('ip').textContent = `${data.ip}`;
  } catch (error) {
    console.error('Gagal mengambil alamat IP:', error); // Pesan error lebih informatif
  }
}

getIP();
});