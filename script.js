// function untuk logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}


let activeMenu = null;
let activeMenuIdDropdown = null;

function toggleMenu(id, selected_menu) {
    const submenu = document.getElementById(id);

    // tutup menu lain yang terbuka
    if (activeMenu && activeMenu !== submenu) {
        activeMenu.classList.add("hidden");
    }

    // toggle submenu
    submenu.classList.toggle("hidden");

    // simpan menu aktif
    activeMenu = submenu.classList.contains("hidden") ? null : submenu;

    // ====== tambahan untuk font-bold ======

    // kalau ada menu sebelumnya yang aktif, balikin tampilannya
    if (activeMenuIdDropdown && activeMenuIdDropdown !== selected_menu) {
        document.getElementById(activeMenuIdDropdown).classList.remove('font-[820]');
        document.getElementById(activeMenuIdDropdown).classList.add('font-bold');
    }

    // kalau submenu ditutup, hilangkan font-bold
    if (submenu.classList.contains('hidden')) {
        document.getElementById(selected_menu).classList.remove('font-[820]');
        document.getElementById(selected_menu).classList.add('font-bold');
        activeMenuIdDropdown = null;
    } else {
        // submenu dibuka → kasih font-bold
        document.getElementById(selected_menu).classList.add('font-[820]');
        document.getElementById(selected_menu).classList.remove('font-bold');
        activeMenuIdDropdown = selected_menu;
    }
}


//function untuk menampilkan sidebar
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
let isOpenSideBar = false;

menuBtn.addEventListener('click', () => {
    isOpenSideBar = !isOpenSideBar;
    sidebar.classList.toggle('slide-in');
    sidebar.classList.toggle('slide-out');
    menuBtn.innerHTML = isOpenSideBar ? '☰' : '☰';
});


// data point untuk akses materi
let userPoints = 100
const materiData = [
    {
        "file": "beranda.html",
        "level": 0,
    },
    {
        "file": "pre_test.html",
        "level": 0,
    },
    {
        "file": "post_test.html",
        "level": 0,
    },
    {
        "file": "struktur_sistem_saraf.html",
        "level": 0,
    },
    {
        "file": "jenis_sistem_saraf.html",
        "level": 0,
    },
    {
        "file": "gerak_sadar_reflek.html",
        "level": 0,
    },
    {
        "file": "kelainan_sistem_saraf.html",
        "level": 0,
    },
    {
        "file": "penghantaran_impuls.html",
        "level": 0,
    },
    {
        "file": "profil.html",
        "level": 0,
    },
]


// function untuk menampilkan konten
let activeMenuId = null; 

function loadContent(page, id) {
    const materi = materiData.find(m => m.file === page);
    if (!materi) {
        alert('Materi tidak ditemukan.');
        return;
    }

    if (materi.level > userPoints + 1) {
        alert('Anda belum bisa mengakses materi ini. Selesaikan materi sebelumnya terlebih dahulu.');
        return;
    }

    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            
            if (materi.level === userPoints + 1) {
                userPoints = materi.level;
            }
            console.log(userPoints);

            if (activeMenuId) {
                document.getElementById(activeMenuId).classList.remove('font-bold', 'bg-red-400', 'text-white');
                document.getElementById(activeMenuId).classList.add('text-black', 'font-semibold');
            }

            document.getElementById(id).classList.add('font-bold', 'bg-red-400', 'text-white');
            document.getElementById(id).classList.remove('text-black', 'font-semibold');

            activeMenuId = id;

            if (window.innerWidth < 960 && isOpenSideBar) {
                isOpenSideBar = false;
                sidebar.classList.remove('slide-in');
                sidebar.classList.add('slide-out');
            }
        })
        .catch(error => console.error('Gagal memuat konten:', error));
}