const parsenik = require('parsenik');

module.exports = function (app) {

app.get("/search/parsenik", (req, res) => {
    const { nik } = req.query; // Ambil NIK dari query parameter

    if (!nik || nik.length !== 16) {
        return res.status(400).json({
            status: false,
            message: "NIK harus memiliki 16 digit",
        });
    }

    // Konversi NIK dari string ke number
    const nikNumber = parseInt(nik, 10);

    if (isNaN(nikNumber)) {
        return res.status(400).json({
            success: false,
            message: "NIK harus berupa angka",
        });
    }

    try {
        const hasil = parsenik.parse(nikNumber); // Parsing NIK menggunakan library parsenik
        res.status(200).json({
            status: true,
            result: hasil,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Gagal mem-parsing NIK",
            error: error.message,
        });
    }
});
};