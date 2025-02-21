// Fungsi Format Angka
function formatAngka(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Navigasi antar halaman
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Pendapatan
function tambahPendapatan() {
    const item = document.getElementById('pendapatanItem').value;
    const jumlah = Number(document.getElementById('pendapatanJumlah').value);
    const tanggal = new Date().toLocaleDateString();

    if (item && jumlah) {
        const pendapatanList = JSON.parse(localStorage.getItem('pendapatan')) || [];
        pendapatanList.push({ item, jumlah, tanggal });
        localStorage.setItem('pendapatan', JSON.stringify(pendapatanList));
        updateRingkasan();
        tampilPendapatan();
        document.getElementById('pendapatanItem').value = '';
        document.getElementById('pendapatanJumlah').value = '';
    }
}

function hapusPendapatan(index) {
    const pendapatanList = JSON.parse(localStorage.getItem('pendapatan')) || [];
    pendapatanList.splice(index, 1);
    localStorage.setItem('pendapatan', JSON.stringify(pendapatanList));
    updateRingkasan();
    tampilPendapatan();
}

function tampilPendapatan() {
    const listPendapatan = document.getElementById('listPendapatan');
    listPendapatan.innerHTML = '';
    const pendapatanList = JSON.parse(localStorage.getItem('pendapatan')) || [];

    pendapatanList.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.item}</td>
            <td>Rp ${formatAngka(data.jumlah)}</td>
            <td>${data.tanggal}</td>
            <td><button class="delete-button" onclick="hapusPendapatan(${index})">Hapus</button></td>
        `;
        listPendapatan.appendChild(row);
    });
}

// Pengeluaran
function tambahPengeluaran() {
    const item = document.getElementById('pengeluaranItem').value;
    const jumlah = Number(document.getElementById('pengeluaranJumlah').value);
    const tanggal = new Date().toLocaleDateString();

    if (item && jumlah) {
        const pengeluaranList = JSON.parse(localStorage.getItem('pengeluaran')) || [];
        pengeluaranList.push({ item, jumlah, tanggal });
        localStorage.setItem('pengeluaran', JSON.stringify(pengeluaranList));
        updateRingkasan();
        tampilPengeluaran();
        document.getElementById('pengeluaranItem').value = '';
        document.getElementById('pengeluaranJumlah').value = '';
    }
}

function hapusPengeluaran(index) {
    const pengeluaranList = JSON.parse(localStorage.getItem('pengeluaran')) || [];
    pengeluaranList.splice(index, 1);
    localStorage.setItem('pengeluaran', JSON.stringify(pengeluaranList));
    updateRingkasan();
    tampilPengeluaran();
}

function tampilPengeluaran() {
    const listPengeluaran = document.getElementById('listPengeluaran');
    listPengeluaran.innerHTML = '';
    const pengeluaranList = JSON.parse(localStorage.getItem('pengeluaran')) || [];

    pengeluaranList.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.item}</td>
            <td>Rp ${formatAngka(data.jumlah)}</td>
            <td>${data.tanggal}</td>
            <td><button class="delete-button" onclick="hapusPengeluaran(${index})">Hapus</button></td>
        `;
        listPengeluaran.appendChild(row);
    });
}

// Tabungan
function tambahTabungan() {
    const item = document.getElementById('tabunganItem').value;
    const jumlah = Number(document.getElementById('tabunganJumlah').value);
    const tanggal = new Date().toLocaleDateString();

    if (item && jumlah) {
        const tabunganList = JSON.parse(localStorage.getItem('tabungan')) || [];
        tabunganList.push({ item, jumlah, tanggal });
        localStorage.setItem('tabungan', JSON.stringify(tabunganList));
        updateRingkasan();
        tampilTabungan();
        document.getElementById('tabunganItem').value = '';
        document.getElementById('tabunganJumlah').value = '';
    }
}

function hapusTabungan(index) {
    const tabunganList = JSON.parse(localStorage.getItem('tabungan')) || [];
    tabunganList.splice(index, 1);
    localStorage.setItem('tabungan', JSON.stringify(tabunganList));
    updateRingkasan();
    tampilTabungan();
}

function tampilTabungan() {
    const listTabungan = document.getElementById('listTabungan');
    listTabungan.innerHTML = '';
    const tabunganList = JSON.parse(localStorage.getItem('tabungan')) || [];

    tabunganList.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.item}</td>
            <td>Rp ${formatAngka(data.jumlah)}</td>
            <td>${data.tanggal}</td>
            <td><button class="delete-button" onclick="hapusTabungan(${index})">Hapus</button></td>
        `;
        listTabungan.appendChild(row);
    });
}

// Update Ringkasan
function updateRingkasan() {
    const pendapatanList = JSON.parse(localStorage.getItem('pendapatan')) || [];
    const totalPendapatan = pendapatanList.reduce((sum, data) => sum + data.jumlah, 0);
    document.getElementById('totalPendapatan').textContent = formatAngka(totalPendapatan);

    const pengeluaranList = JSON.parse(localStorage.getItem('pengeluaran')) || [];
    const totalPengeluaran = pengeluaranList.reduce((sum, data) => sum + data.jumlah, 0);
    document.getElementById('totalPengeluaran').textContent = formatAngka(totalPengeluaran);

    // Tambahkan Saldo (Pendapatan - Pengeluaran)
    const saldo = totalPendapatan - totalPengeluaran;
    document.getElementById('saldo').textContent = formatAngka(saldo);

    // Tambahkan Total Tabungan
    const tabunganList = JSON.parse(localStorage.getItem('tabungan')) || [];
    const totalTabungan = tabunganList.reduce((sum, data) => sum + data.jumlah, 0);
    document.getElementById('totalTabungan').textContent = formatAngka(totalTabungan);
}

// Panggil fungsi saat halaman dibuka
window.onload = function() {
    updateRingkasan();
    tampilPendapatan();
    tampilPengeluaran();
    tampilTabungan();
}
