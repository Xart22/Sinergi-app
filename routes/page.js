const { json } = require("express");
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db_config = {
  host: "45.130.230.43",
  port :"3306",
  user: "u1025839_data_sinergi",
  password: "sinergi!@#",
  database: "u1025839_sinergi",
  dateStrings: 'date'
};
function handleDisconnect() {
  db = mysql.createConnection(db_config); // Recreate the connection, since
  db.connect((error) => {
    if (error) {
      console.log(error)
    } else {
      console.log("SUKSES");
    }
  });
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else if(err.code === 'ECONNRESET') {                                      // connnection idle timeout (the wait_timeout
        handleDisconnect();                              // server variable configures this)
    }else{
      throw err
    }
  });
}
handleDisconnect();


var datahold = [];
var proses = [];
var dataproses = [];
var nm=[]
var inv =[];
var cetaklns;
var cetakdp;
// GET
router.get("/tes",(req,res)=>{
  res.render("tes.hbs")
})
router.get("/pembayaran",(req,res)=>{
  db.query("SELECT * FROM inv_cetak_dp",(err,result)=>{
    cetakdp = result
    for (let i = 0; i < cetakdp.length; i++) {
      var tgl_cetak = cetakdp[i].tgl_cetak;
      var aw = new Date(tgl_cetak).toJSON().slice(0, 10).replace("T", " ");
      cetakdp[i].tgl_cetak = aw;
    }
  })
  db.query("SELECT * FROM inv_cetak_lunas",(err,result)=>{
    cetaklns= result
    for (let i = 0; i < cetaklns.length; i++) {
      var tgl_cetak = cetaklns[i].tgl_cetak;
      var aw = new Date(tgl_cetak).toJSON().slice(0, 10).replace("T", " ");
      cetaklns[i].tgl_cetak = aw;
    }
  })
  res.render("pembayaran.hbs",{lns : cetaklns,dp :cetakdp,usr :req.session.username})
  cetakdp="";
  cetaklns="";
})


router.get("/no_invoice",(req,res)=>{
  db.query("SELECT * FROM inv ORDER BY id DESC LIMIT 1;",(err,result)=>{
    res.json(result) 
  })

})
router.get("/kodeska",(req,res)=>{
  db.query("SELECT * FROM kode_ska",(err,results)=>{
    if (err) throw err
    res.json(results)
  })
})
router.get("/kodesbu",(req,res)=>{
  db.query("SELECT * FROM kode_sbu",(err,results)=>{
    if (err) throw err
    res.json(results)
  })
})
router.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.redirect("home");
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/cetakinvoice", (req, res) => {
db.query("SELECT id, nm_client FROM tbl_client",(err,results)=>{
  if(err)throw err
  res.render("invoice.hbs",{tbl : results,hide : "show",use : req.session.username});
})
  datahold = [];
  nm=[]
  inv=[]
});

router.get("/inputska", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM tbl_client",(err,results)=>{
      if (err)throw err
      res.render("inputska.hbs", { usr: req.session.username,client :results, msg: "HAIII" });
    })
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/inputsbu", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM tbl_client",(err,results)=>{
      if (err)throw err
      res.render("inputsbu.hbs", { usr: req.session.username,client :results, msg: "HAIII" });
    })
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/inputiso", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM tbl_client",(err,results)=>{
      if (err)throw err
      res.render("inputiso.hbs", { usr: req.session.username,client :results, msg: "HAIII" });
    })
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/inputk3", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM tbl_client",(err,results)=>{
      if (err)throw err
      res.render("inputk3.hbs", { usr: req.session.username,client :results, msg: "HAIII" });
    })
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/inputakta", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM tbl_client",(err,results)=>{
      if (err)throw err
      res.render("inputakta.hbs", { usr: req.session.username,client :results, msg: "HAIII" });
    })
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/login", (req, res) => {
  if (req.session.loggedin) {
    res.redirect("home");
  } else {
    res.render("login.hbs");
  }
  datahold = [];
});
router.get("/dataholding", (req, res) => {
  if (req.session.loggedin) {
    db.query("SELECT * FROM data_hold_ska", (err, results) => {
      if (err) throw err;
      datahold.push(results);
      for (let i = 0; i < datahold[0].length; i++) {
        const tgl_masuk = datahold[0][i].tgl_masuk;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        datahold[0][i].tgl_masuk = aw;
      }

    });
    db.query("SELECT * FROM data_hold_sbu", (err, results, fields) => {
      if (err) throw err;
      datahold.push(results);
      for (let i = 0; i < datahold[1].length; i++) {
        const tgl_masuk = datahold[1][i].tgl_masuk;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        datahold[1][i].tgl_masuk = aw;
      }
    });
    db.query("SELECT * FROM data_hold_iso", (err, results, fields) => {
      if (err) throw err;
      datahold.push(results);
      for (let i = 0; i < datahold[2].length; i++) {
        const tgl_masuk = datahold[2][i].tgl_masuk;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        datahold[2][i].tgl_masuk = aw;
      }
    });
    db.query("SELECT * FROM data_hold_k3", (err, results, fields) => {
      if (err) throw err;
      datahold.push(results);
      for (let i = 0; i < datahold[3].length; i++) {
        const tgl_masuk = datahold[3][i].tgl_masuk;
        const jadwal = datahold[3][i].jadwal;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        var ab = new Date(jadwal).toJSON().slice(0, 10).replace("T", " ");
        datahold[3][i].tgl_masuk = aw;
        datahold[3][i].jadwal = ab;
      }
    });
    db.query("SELECT * FROM data_hold_akta", (err, results, fields) => {
      if (err) {
        res.render("home.hbs", { message: err });
      } else {
        datahold.push(results);
        for (let i = 0; i < datahold[4].length; i++) {
          const tgl_masuk = datahold[4][i].tgl_masuk;
          var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
          datahold[4][i].tgl_masuk = aw;
        }
        res.render("dataholding.hbs", {
          ska: datahold[0],
          sbu: datahold[1],
          iso: datahold[2],
          k3: datahold[3],
          akta: datahold[4],
          usr: req.session.username,
          msg: "HAIII",
        });
      }
    });
  } else {
    res.status(401).render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});

router.get("/detailska", (req, res) => {
  if (req.session.loggedin && req.session.username) {
    res.render("proses.hbs", {
      usr: req.session.username,
    });
    datahold = [];
  } else {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});
router.get("/detailsbu", (req, res) => {
  if (req.session.loggedin && req.session.username) {
    res.render("detailsbu.hbs", {
      usr: req.session.username,
    });
    datahold = [];
  } else {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});

router.get("/detailiso", (req, res) => {
  if (req.session.loggedin && req.session.username) {
    res.render("detailiso.hbs", {
      usr: req.session.username,
    });
    datahold = [];
  } else {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});
router.get("/detailk3", (req, res) => {
  if (req.session.loggedin && req.session.username) {
    res.render("detailk3.hbs", {
      usr: req.session.username,
    });
    datahold = [];
  } else {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});
router.get("/detailakta", (req, res) => {
  if (req.session.loggedin && req.session.username) {
    res.render("detailakta.hbs", {
      usr: req.session.username,
    });
    datahold = [];
  } else {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});

router.get("/home", (req, res) => {
  datahold = [];
  dataproses = [];
  if (req.session.loggedin && req.session.username) {
    db.query("SELECT * FROM data_proses_ska", (err, results, fields) => {
      if (err) throw err;
      dataproses.push(results);
      for (let i = 0; i < dataproses[0].length; i++) {
        const tgl_masuk = dataproses[0][i].tgl_proses;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        dataproses[0][i].tgl_proses = aw;
      }
    });
    db.query("SELECT * FROM data_proses_sbu", (err, results, fields) => {
      if (err) throw err;
      dataproses.push(results);
      for (let i = 0; i < dataproses[1].length; i++) {
        const tgl_masuk = dataproses[1][i].tgl_proses;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        dataproses[1][i].tgl_proses = aw;
      }
    });
    db.query("SELECT * FROM data_proses_iso", (err, results, fields) => {
      if (err) throw err;
      dataproses.push(results);
      for (let i = 0; i < dataproses[2].length; i++) {
        const tgl_masuk = dataproses[2][i].tgl_proses;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        dataproses[2][i].tgl_proses = aw;
      }
    });
    db.query("SELECT * FROM data_proses_k3", (err, results, fields) => {
      if (err) throw err;
      dataproses.push(results);
      for (let i = 0; i < dataproses[3].length; i++) {
        const tgl_masuk = dataproses[3][i].tgl_proses;
        var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
        dataproses[3][i].tgl_proses = aw;
      }
    });
    db.query("SELECT * FROM data_proses_akta", (err, results, fields) => {
      if (err) {
        throw err
      } else {
        dataproses.push(results);
        for (let i = 0; i < dataproses[4].length; i++) {
          const tgl_masuk = dataproses[4][i].tgl_proses;
          var aw = new Date(tgl_masuk).toJSON().slice(0, 10).replace("T", " ");
          dataproses[4][i].tgl_proses = aw;
        }
        res.render("home.hbs", {
          ska: dataproses[0],
          sbu: dataproses[1],
          iso: dataproses[2],
          k3: dataproses[3],
          akta: dataproses[4],
          usr: req.session.username,
          msg: "HAIII",
        });
        dataproses =[]
      }
    });
  } else {
    res.status(401).render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  }
});

//POST

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (error, results, fields) => {
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.status(200).redirect("home");
          } else {
            res.render("login.hbs", {
              message: "USERNAME DAN PASSWORD SALAH",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", {
        message: "ISI USERNAME DAN PASSWORD",
      });
    }
  } catch (error) {}
});

router.post("/inputska", (req, res) => {
  const {
    nama,
    nik,
    npwp,
    service,
    klasifikasi,
    kode,
    keterangan,
    pjd,
    date,
    nc,
    al1,
    al2,
    tlpc,
    harga,
    desc
  } = req.body;
  console.log(al1)
  db.query(
    "INSERT INTO data_hold_ska (nama,nik,npwp,service,klasifikasi,kode,keterangan,pjd,harga,nm_client,tgl_masuk) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [
      nama,
      nik,
      npwp,
      service,
      klasifikasi,
      kode+" "+desc,
      keterangan,
      pjd,
      harga,
      nc,
      date,
    ],
    (err, results) => {
      if (err) throw err;
      if (al1 == undefined){ 
        db.query("INSERT INTO invoice_ska (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,klasifikasi,klasifikasi+" "+kode+" "+desc+" a.n "+nama,harga]),
        res.render("inputska.hbs", { msg: "SUKSES INPUT DATA" });  
      }else{
        db.query("INSERT INTO tbl_client (nm_client,alamat1,alamat2,tlp) VALUES (?,?,?,?)",[nc,al1,al2,tlpc],(err,results)=>{
          if (err) throw err
          db.query("INSERT INTO invoice_ska (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,klasifikasi,klasifikasi+" "+kode+" "+desc+" a.n "+nama,harga]),
          res.render("inputska.hbs", { msg: "SUKSES INPUT DATA" });  
        })
      }
    
    }
  );
});

router.post("/inputsbu", (req, res) => {
  const {
    nbu,
    npwpbu,
    service,
    klasifikasi,
    sub,
    np,
    tlp,
    keterangan,
    pjd,
    date,
    nc,
    al1,
    al2,
    tlpc,
    harga,

  } = req.body;
  var x = sub.toString();
  db.query(
    "INSERT INTO data_hold_sbu (nbu,npwpbu,service,klasifikasi,sub,np,tlp,keterangan,pjd,harga,nm_client,tgl_masuk) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      nbu,
      npwpbu,
      service,
      klasifikasi,
      x,
      np,
      tlp,
      keterangan,
      pjd,
      harga,
      nc,
      date
    ],
    (err, results) => {
      if (err) throw err;
      if (al1 == undefined){
        db.query("INSERT INTO invoice_sbu (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,"SBU"+" "+klasifikasi +" "+service,"SUB "+x+" "+nbu,harga]),
        res.render("inputsbu.hbs", { msg: "SUKSES INPUT DATA" });  
      }else{
        db.query("INSERT INTO tbl_client (nm_client,alamat1,alamat2,tlp) VALUES (?,?,?,?)",[nc,al1,al2,tlpc],(err,results)=>{
          if (err) throw err
          db.query("INSERT INTO invoice_sbu (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,"SBU"+" "+klasifikasi +" "+service,"SUB "+x+" "+nbu,harga]),
          res.render("inputsbu.hbs", { msg: "SUKSES INPUT DATA" });
        })
      }
    }
  );
});

router.post("/inputiso", (req, res) => {
  const { nbu, service, kode, np, keterangan, pjd, date,nc,
    al1,
    al2,
    tlpc,
    harga, } = req.body;
    var x = kode.toString()
    db.query("INSERT INTO data_hold_iso (nbu,service,kode,np,keterangan,pjd,nm_client,harga,tgl_masuk) VALUES (?,?,?,?,?,?,?,?,?)",[nbu,service,x,np,keterangan,pjd,nc,harga,date],(err,result)=>{
      if (err) throw err
      if (al1 == undefined){
        db.query("INSERT INTO invoice_iso (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,service+" ISO",x,harga],(err,result)=>{
          if(err) throw err
          res.render("inputsbu.hbs", { msg: "SUKSES INPUT DATA" });
        })
      }else{
        db.query("INSERT INTO tbl_client (nm_client,alamat1,alamat2,tlp) VALUES (?,?,?,?)",[nc,al1,al2,tlpc],(err,results)=>{
          if (err) throw err
          db.query("INSERT INTO invoice_iso (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,service +" ISO",x,harga]),
          res.render("inputsbu.hbs", { msg: "SUKSES INPUT DATA" });
        })
      }
    })

});

router.post("/inputk3", (req, res) => {
  const { nama, service, pelatihan, jdw, keterangan, pjd, date,nc,
    al1,
    al2,
    tlpc,
    harga, } = req.body;
  db.query(
    "INSERT INTO data_hold_k3 (nama,service,pelatihan,jadwal,keterangan,pjd,nm_client,harga,tgl_masuk) VALUES(?,?,?,?,?,?,?,?,?)",
    [nama, service, pelatihan, jdw, keterangan, pjd,nc,harga, date,],
    (err, results) => {
      if (err) throw err;
      if (al1 == undefined){
        db.query("INSERT INTO invoice_k3 (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,service+" "+pelatihan,"a.n "+nama,harga]),
        res.render("inputk3.hbs", { msg: "SUKSES INPUT PESERTA" });  
      }else{
        db.query("INSERT INTO tbl_client (nm_client,alamat1,alamat2,tlp) VALUES (?,?,?,?)",[nc,al1,al2,tlpc],(err,results)=>{
          if (err) throw err
          db.query("INSERT INTO invoice_k3 (id,nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,service+" "+pelatihan,"a.n "+nama,harga]),
          res.render("inputk3.hbs", { msg: "SUKSES INPUT PESERTA" });  
        })
      }
    }
  );
});

router.post("/inputakta", (req, res) => {
  const { np,cnbu, tlp, service, jenis, keterangan, pjd, date,nc,
    al1,
    al2,
    tlpc,
    harga, } = req.body;
  db.query(
    "INSERT INTO data_hold_akta (np,tlp,jenis,service,keterangan,cnbu,pjd,nm_client,harga,tgl_masuk) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [np, tlp, jenis, service, keterangan,cnbu, pjd,nc,harga,date],
    (err, results) => {
      if (err) throw err;
      if (al1 == undefined){
        db.query("INSERT INTO invoice_akta (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,"Akta "+jenis,service+" Akta "+cnbu,harga]),
        res.render("inputakta.hbs", { msg: "SUKSES INPUT DATA" });  
      }else{
        db.query("INSERT INTO tbl_client (nm_client,alamat1,alamat2,tlp) VALUES (?,?,?,?)",[nc,al1,al2,tlpc],(err,results)=>{
          if (err) throw err
          db.query("INSERT INTO invoice_akta (nm_client,produk,keterangan,harga) VALUES (?,?,?,?)",[nc,"Akta "+jenis,service+" Akta "+cnbu,harga]),
          res.render("inputakta.hbs", { msg: "SUKSES INPUT DATA" });  
        })
      }
    }
  );
});
router.post("/searchska", (req, res) => {
  try {
    proses = [];
    const search = req.body.search;
    
    if (req.session.loggedin) {
      db.query(
        "SELECT * FROM data_hold_ska WHERE id = ?",
        [search],
        (err, results) => {
          if (results.length > 0) {
            proses.push(results);
            const tgl = proses[0][0].tgl_masuk;
            var aw = new Date(tgl).toJSON().slice(0, 10).replace("T", " ");
            res.render("proses.hbs", {
              data: results,
              date: "Tanggal Proses",
              tgl: aw,
              usr: req.session.username,
            });
          } else {
            res.render("proses.hbs", {
              msg: "Data Tidak Ditemukan",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", {
        message: "PLEASE LOGIN FIRST !",
      });
    }
  } catch (error) {}
});

router.post("/updateska", (req, res) => {
  const { nama, nik, npwp, service, klasifikasi, kode, pjd, date,harga,ket } = req.body;
  var desc =req.body.desc
  const id = proses[0][0].id;
  var aw = new Date(date).toJSON().slice(0, 10).replace("T", " ");
  if (!req.session.loggedin) {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  } else if (desc == undefined) {
    db.query(
      "UPDATE data_hold_ska SET nama = ?,nik = ?,npwp = ?,service = ?,klasifikasi = ?,kode = ?,pjd = ?,tgl_masuk = ?,harga = ?,keterangan =? WHERE id= ?",
      [nama, nik, npwp, service, klasifikasi, kode, pjd, aw,harga,ket, id],
      (err, results) => {
        if (err) throw err;
        datahold = [];
        proses = [];
        db.query("UPDATE invoice_sbu SET keterangan =?,produk =?,harga =? WHERE id = ?",[klasifikasi+" "+kode+" a.n "+nama,klasifikasi,harga,id])
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }else {
    db.query(
      "UPDATE data_hold_ska SET nama = ?,nik = ?,npwp = ?,service = ?,klasifikasi = ?,kode = ?,pjd = ?,tgl_masuk = ?,harga = ?,keterangan =? WHERE id= ?",
      [nama, nik, npwp, service, klasifikasi, kode + " " +desc, pjd, aw,harga,ket, id],
      (err, results) => {
        if (err) throw err;
        datahold = [];
        proses = [];
        db.query("UPDATE invoice_sbu SET keterangan =?,produk =?,harga =? WHERE id = ?",[klasifikasi+" "+kode+" "+desc+" a.n "+nama,klasifikasi,harga,id])
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }
  
});
router.post("/deleteska", (req, res) => {
  const id = proses[0][0].id;
  if (req.session.loggedin) {
    db.query("DELETE FROM data_hold_ska WHERE id= ?", [id], (err, results) => {
      if (err) throw err;
      db.query("DELETE FROM invoice_ska WHERE id= ?",id);
      datahold = [];
      proses = [];
      res.render("home.hbs", { msg: "SUKSES DELETE DATA" });
    });
  }
});

router.post("/searchsbu", (req, res) => {
  try {
    proses = [];
    const search = req.body.search;
    if (req.session.loggedin) {
      db.query(
        "SELECT * FROM data_hold_sbu WHERE id = ?",
        [search],
        (err, results) => {
          if (results.length > 0) {
            proses.push(results);
            const tgl = proses[0][0].tgl_masuk;
            var aw = new Date(tgl).toJSON().slice(0, 10).replace("T", " ");
            res.render("detailsbu.hbs", {
              data: results,
              date: "Tanggal Proses",
              tgl: aw,
              usr: req.session.username,
            });
          } else {
            res.render("detailsbu.hbs", {
              msg: "Data Tidak Ditemukan",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", { message: "PLEASE LOGIN FRIST" });
    }
  } catch (error) {}
});

router.post("/updatesbu", (req, res) => {
  const {
    nbu,
    npwpbu,
    service,
    klasifikasi,
    sub,
    np,
    tlp,
    keterangan,
    pjd,
    date,
    harga
  } = req.body;
  const id = proses[0][0].id;
  if (!req.session.loggedin) {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  } else {
    var aw = new Date(date).toJSON().slice(0, 10).replace("T", " ");
    db.query(
      "UPDATE data_hold_sbu SET nbu =?,npwpbu=?,service=?,klasifikasi=?,sub=?,np=?,tlp=?,keterangan=?,pjd=?,tgl_masuk=? WHERE id= ?",
      [
        nbu,
        npwpbu,
        service,
        klasifikasi,
        sub,
        np,
        tlp,
        keterangan,
        pjd,
        aw,
        id,
      ],
      (err, results) => {
        if (err) throw err;
        db.query("UPDATE invoice_sbu SET produk =?,keterangan =?,harga =? WHERE id= ?",["SBU"+" "+klasifikasi +" "+service,"SUB "+sub,harga,id])
        datahold = [];
        proses = [];
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }
});

router.post("/deletesbu", (req, res) => {
  const id = proses[0][0].id;
  if (req.session.loggedin) {
    db.query("DELETE FROM data_hold_sbu WHERE id= ?", [id], (err, results) => {
      if (err) throw err;
       // INVOICE
       db.query("DELETE FROM invoice_sbu WHERE id =?",id,(err,results)=>{
         if (err)throw err
       });
      datahold = [];
      proses = [];
      res.render("home.hbs", { msg: "SUKSES DELETE DATA" });
    });
  }
});

router.post("/searchiso", (req, res) => {
  try {
    proses = [];
    const search = req.body.search;
    if (req.session.loggedin) {
      db.query(
        "SELECT * FROM data_hold_iso WHERE id = ?",
        [search],
        (err, results) => {
          if (results.length > 0) {
            proses.push(results);
            const tgl = proses[0][0].tgl_masuk;
            var aw = new Date(tgl).toJSON().slice(0, 10).replace("T", " ");
            res.render("detailiso.hbs", {
              data: results,
              date: "Tanggal Proses",
              tgl: aw,
              usr: req.session.username,
            });
          } else {
            res.render("detailiso.hbs", {
              msg: "Data Tidak Ditemukan",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", { message: "PLEASE LOGIN FRIST" });
    }
  } catch (error) {}
});


router.post("/updateiso", (req, res) => {
  const { nbu, service, kode, np, keterangan, pjd, date,harga } = req.body;
  const id = proses[0][0].id;
  if (!req.session.loggedin) {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  } else {
    var aw = new Date(date).toJSON().slice(0, 10).replace("T", " ");
    db.query(
      "UPDATE data_hold_iso SET nbu =?,service=?,kode=?,np=?,keterangan=?,pjd=?,tgl_masuk=?,harga =? WHERE id= ?",
      [nbu, service, kode, np, keterangan, pjd, aw,harga, id],
      (err, results) => {
        if (err) throw err;
    db.query("UPDATE invoice_iso SET keterangan =?,harga=? WHERE id =?",[kode,harga,id])
        datahold = [];
        proses = [];
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }
});

router.post("/deleteiso", (req, res) => {
  const id = proses[0][0].id;
  if (req.session.loggedin) {
    db.query("DELETE FROM data_hold_iso WHERE id= ?", [id], (err, results) => {
      if (err) throw err;
      db.query("DELETE FROM invoice_iso WHERE id =?",id,(err,results)=>{
        if (err)throw err
      });
     datahold = [];
      datahold = [];
      proses = [];
      res.render("home.hbs", { msg: "SUKSES DELETE DATA" });
    });
  }
});
//K3

router.post("/searchk3", (req, res) => {
  try {
    proses = [];
    const search = req.body.search;
    if (req.session.loggedin) {
      db.query(
        "SELECT * FROM data_hold_k3 WHERE id = ?",
        [search],
        (err, results) => {
          if (results.length > 0) {
            proses.push(results);
            const jdw = proses[0][0].jadwal;
            const tgl = proses[0][0].tgl_masuk;
            var aw = new Date(tgl).toJSON().slice(0, 10).replace("T", " ");
            var jj = new Date(jdw).toJSON().slice(0, 10).replace("T", " ");
            res.render("detailk3.hbs", {
              data: results,
              date: "Tanggal Proses",
              tgl: aw,
              jdw: jj,
              usr: req.session.username,
            });
          } else {
            res.render("detailk3.hbs", {
              msg: "Data Tidak Ditemukan",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", { message: "PLEASE LOGIN FRIST" });
    }
  } catch (error) {}
});


router.post("/updatek3", (req, res) => {
  const { nama, service, pelatihan, keterangan, pjd, date, jdw,harga } = req.body;
  const id = proses[0][0].id;
  if (!req.session.loggedin) {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  } else {
    var aw = new Date(date).toJSON().slice(0, 10).replace("T", " ");
    var jj = new Date(jdw).toJSON().slice(0, 10).replace("T", " ");
    db.query(
      "UPDATE data_hold_k3 SET nama =?,service=?,pelatihan=?,keterangan=?,pjd=?,tgl_masuk=?,jadwal=?,harga =? WHERE id= ?",
      [nama, service, pelatihan, keterangan, pjd, aw, jj,harga, id],
      (err, results) => {
        if (err) throw err;
        db.query("UPDATE invoice_k3 SET keterangan =?,harga =?,produk =? WHERE id =?",["A.n "+nama,harga,service+" "+pelatihan,id ])
        datahold = [];
        proses = [];
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }
});

router.post("/deletek3", (req, res) => {
  const id = proses[0][0].id;
  if (req.session.loggedin) {
    db.query("DELETE FROM data_hold_k3 WHERE id= ?", [id], (err, results) => {
      if (err) throw err;
      db.query("DELETE FROM invoice_k3 WHERE id =?",id,(err,results)=>{
        if (err)throw err
      });
      datahold = [];
      proses = [];
      res.render("home.hbs", { msg: "SUKSES DELETE DATA" });
    });
  }
});

// AKTA

router.post("/searchakta", (req, res) => {
  try {
    proses = [];
    const search = req.body.search;
    if (req.session.loggedin) {
      db.query(
        "SELECT * FROM data_hold_akta WHERE id = ?",
        [search],
        (err, results) => {
          if (results.length > 0) {
            proses.push(results);
            const tgl = proses[0][0].tgl_masuk;
            var aw = new Date(tgl).toJSON().slice(0, 10).replace("T", " ");
            res.render("detailakta.hbs", {
              data: results,
              date: "Tanggal Proses",
              tgl: aw,
              usr: req.session.username,
            });
          } else {
            res.render("detailakta.hbs", {
              msg: "Data Tidak Ditemukan",
            });
          }
        }
      );
    } else {
      res.render("login.hbs", { message: "PLEASE LOGIN FRIST" });
    }
  } catch (error) {}
});

router.post("/updateakta", (req, res) => {
  const { jenis, np, tlp, keterangan, pjd, date,cnbu,harga,service } = req.body;
  const id = proses[0][0].id;
  if (!req.session.loggedin) {
    res.render("login.hbs", {
      message: "PLEASE LOGIN FIRST !",
    });
  } else {
    var aw = new Date(date).toJSON().slice(0, 10).replace("T", " ");
    db.query("UPDATE data_hold_akta SET jenis = ? ,np = ?,tlp = ?,keterangan = ?,pjd = ?,tgl_masuk = ?,cnbu = ?,harga = ? WHERE id = ?",
      [jenis, np, tlp, keterangan, pjd, aw,cnbu,harga, id],
      (err, results) => {
        if (err) throw err;
        db.query("UPDATE invoice_akta SET produk=?,keterangan=?,harga=?  WHERE id =?",["Akta "+jenis,service+" Akta "+cnbu,harga,id]),
        datahold = [];
        proses = [];
        res.render("home.hbs", { msg: "SUKSES UPDATE DATA" });
      }
    );
  }
});

router.post("/deleteakta", (req, res) => {
  const id = proses[0][0].id;
  if (req.session.loggedin) {
    db.query("DELETE FROM data_hold_akta WHERE id= ?", [id], (err, results) => {
      if (err) throw err;
      db.query("DELETE FROM invoice_akta WHERE id =?",id,(err,results)=>{
        if (err)throw err
      });
      datahold = [];
      proses = [];
      res.render("home.hbs", { msg: "SUKSES DELETE DATA" });
    });
  }
});
router.post("/invoice",(req,res)=>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  const id = req.body.id;
  db.query("SELECT * FROM tbl_client WHERE id=?",id,(err,results)=>{
   if (results.length == 0){
    res.redirect("cetakinvoice")
   }else{
    db.query("SELECT * FROM invoice_ska WHERE nm_client =?",results[0].nm_client,(err,results)=>{
    inv.push(results)
    })
    db.query("SELECT * FROM invoice_sbu WHERE nm_client =?",results[0].nm_client,(err,results)=>{
      inv.push(results)
    })
    db.query("SELECT * FROM invoice_k3 WHERE nm_client =?",results[0].nm_client,(err,results)=>{
      inv.push(results)
    })
    db.query("SELECT * FROM invoice_iso WHERE nm_client =?",results[0].nm_client,(err,results)=>{
      inv.push(results)
    })
    db.query("SELECT * FROM invoice_akta WHERE nm_client =?",results[0].nm_client,(err,results)=>{
      inv.push(results)
    })
    res.render("invoice.hbs",{dd :results[0] ,prosesSKA :inv[0],prosesSBU :inv[1],prosesK3 :inv[2],prosesISO:inv[3],prosesAKTA :inv[4],date :today,a:"show"})
    inv=[]
  }
  })
})

router.post("/saveinv",(req,res)=>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  const {idSka,idSbu,idIso,idK3,idAkta,sisa,dp,total,nmc,noinv} = req.body
  console.log(idSka,idSbu,idIso,idK3,idAkta,sisa,dp,total,nmc,noinv)

  var ska,sbu,iso,k3,akta; 
  if (idSka == undefined ) {
    ska = "Tidak ada proses"
  } else if(idSka.length > 1){
    ska = idSka.toString()
      for (let i = 0; i < idSka.length; i++) {
        db.query("DELETE FROM invoice_ska WHERE id = ?",idSka[i],(err,result)=>{
          if (err) throw err
        })
      }
  }else{
    ska =idSka
    db.query("DELETE FROM invoice_ska WHERE id = ?",ska,(err,result)=>{
      if (err) throw err
    })
  }
if (idSbu == undefined ) {
  sbu = "Tidak ada proses"
} else if(idSbu.length > 1){
  sbu = idSbu.toString()
  for (let i = 0; i < idSbu.length; i++) {
    db.query("DELETE FROM invoice_sbu WHERE id = ?",idSbu[i],(err,result)=>{
      if (err) throw err
    })
  }
}else{
  sbu =idSbu
  db.query("DELETE FROM invoice_sbu WHERE id = ?",sbu,(err,result)=>{
    if (err) throw err
  })
}

if (idIso == undefined ) {
  iso = "Tidak ada proses"
} else if(idIso.length > 1){
  iso = idIso.toString()
  for (let i = 0; i < idIso.length; i++) {
    db.query("DELETE FROM invoice_iso WHERE id = ?",idIso[i],(err,result)=>{
      if (err) throw err
    })
  }
}else{
  iso =idIso
  db.query("DELETE FROM invoice_iso WHERE id = ?",iso,(err,result)=>{
    if (err) throw err
  })
}
if (idK3 == undefined ) {
  ik3=0
  k3 = "Tidak ada proses"
} else if(idK3.length > 1){
  k3 = idK3.toString()
  for (let i = 0; i < idK3.length; i++) {
    db.query("DELETE FROM invoice_k3 WHERE id = ?",idK3[i],(err,result)=>{
      if (err) throw err
    })
  }
}else{
  k3 =idK3
  db.query("DELETE FROM invoice_k3 WHERE id = ?",k3,(err,result)=>{
    if (err) throw err
  })
}
if (idAkta == undefined ) {
  akta = "Tidak ada proses"
} else if(idAkta.length > 1){
  akta = idAkta.toString()
  for (let i = 0; i < idAkta.length; i++) {
    db.query("DELETE FROM invoice_akta WHERE id = ?",idAkta[i],(err,result)=>{
      if (err) throw err
    })
  }
}else{
  akta =idAkta
  db.query("DELETE FROM invoice_akta WHERE id = ?",akta,(err,result)=>{
    if (err) throw err
  })
}

if (dp === "") {
  db.query("INSERT INTO inv_cetak_lunas (nm_client,no_inv,idSKA,idSBU,idISO,idK3,idAKTA,total,tgl_cetak) VALUES (?,?,?,?,?,?,?,?,?)",[nmc,noinv,ska,sbu,iso,k3,akta,total,today],(err,result)=>{
  if(err) throw err
  res.send("oke")
  })

} else {
  db.query("INSERT INTO inv_cetak_dp (nm_client,no_inv,idSKA,idSBU,idISO,idK3,idAKTA,total,DP,sisa,tgl_cetak) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[nmc,noinv,ska,sbu,iso,k3,akta,total,dp,sisa,today],(err,result)=>{
    if(err) throw err
    res.send("oke")
  })
}
})

router.post("/createNo",(req,res)=>{
  var int = 27;
  var jam = 12
  var today = new Date();
  var h = today.getHours();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;    
  if (dd == int && jam == h){
    db.query("TRUNCATE TABLE inv;");
    db.query("ALTER table inv Auto_increment = 36")
    db.query("INSERT INTO `inv` (`id`, `nAn`) VALUES (NULL, 'wea');")
    res.send("OKE")
  }else {

      db.query("INSERT INTO `inv` (`id`, `nAn`) VALUES (NULL, 'wea');")
      res.send("OKE")
  }
})


router.post("/proses",(req,res)=>{
  const {idska,idsbu,idk3,idiso,idakta}=req.body
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;


  //SKA
  if (idska == "Tidak ada proses") {
    
  }else{
    var arrska = JSON.parse("["+idska+"]")
    for (let i = 0; i < arrska.length; i++) {
      db.query("INSERT INTO data_proses_ska (id,nama,nik,service,klasifikasi,kode,pjd,tgl_proses,nm_client,harga) SELECT id,nama,nik,service,klasifikasi,kode,pjd,tgl_masuk,nm_client,harga FROM data_hold_ska WHERE id= ?",arrska[i],(err,result)=>{
        if (err) throw err
        db.query("DELETE FROM data_hold_ska WHERE id = ?",arrska[i],(err,result)=>{
          if(err) throw err
        });
        db.query("UPDATE data_proses_ska SET tgl_proses =? WHERE id =?",[today,arrska[i]])
      })}}

      //SBU
      if (idsbu == "Tidak ada proses") {
    
      }else{
        var arrsbu =JSON.parse("["+idsbu+"]")
        for (let i = 0; i < arrsbu.length; i++) {
          db.query("INSERT INTO data_proses_sbu (id,nbu,npwpbu,service,klasifikasi,sub,np,tlp,pjd,tgl_proses,nm_client,harga) SELECT id,nbu,npwpbu,service,klasifikasi,sub,np,tlp,pjd,tgl_masuk,nm_client,harga FROM data_hold_sbu WHERE id= ?",arrsbu[i],(err,result)=>{
            if (err) throw err
            db.query("DELETE FROM data_hold_sbu WHERE id= ?",arrsbu[i])
            db.query("UPDATE data_proses_sbu SET tgl_proses =? WHERE id=?",[today,arrsbu[i]])
          })}}

          //ISO
          if (idiso == "Tidak ada proses") {
    
          }else{
  var arriso = JSON.parse("["+idiso+"]")
            for (let i = 0; i < arriso.length; i++) {
              db.query("INSERT INTO data_proses_iso (id,nbu,service,kode,np,pjd,tgl_proses,nm_client,harga) SELECT id,nbu,service,kode,np,pjd,tgl_masuk,nm_client,harga FROM data_hold_iso WHERE id= ?",arriso[i],(err,result)=>{
                if (err) throw err
                db.query("DELETE FROM data_hold_iso WHERE id=?",arriso[i])
                db.query("UPDATE data_proses_iso SET tgl_proses =? WHERE id =?",[today,arriso[i]])
              })}}

              //K3
              if (idk3 == "Tidak ada proses") {
    
              }else{
                var arrk3 = JSON.parse("["+idk3+"]")
                for (let i = 0; i < arrk3.length; i++) {
                  db.query("INSERT INTO data_proses_k3 (id,nama,service,pelatihan,pjd,tgl_proses,nm_client,harga) SELECT id,nama,service,pelatihan,pjd,tgl_masuk,nm_client,harga FROM data_hold_k3 WHERE id= ?",arrk3[i],(err,result)=>{
                    if (err) throw err
                    db.query("DELETE FROM data_hold_k3 WHERE id=?",arrk3[i])
                    db.query("UPDATE data_proses_k3 SET tgl_proses =? WHERE id=?",[today,arrk3[i]])
                  })}}
                    // AKTA
                    if (idakta == "Tidak ada proses") {
    
                    }else{
                      var arrakta = JSON.parse("["+idakta+"]")
                      for (let i = 0; i < arrakta.length; i++) {
                        db.query("INSERT INTO data_proses_akta (id,jenis,service,nbu,tlp,pjd,tgl_proses,nm_client,harga) SELECT id,jenis,service,cnbu,tlp,pjd,tgl_masuk,nm_client,harga FROM data_hold_akta WHERE id= ?",arrakta[i],(err,result)=>{
                          if (err) throw err
                          db.query("DELETE FROM data_hold_akta WHERE id=?",arrakta[i])
                          db.query("UPDATE data_proses_akta SET tgl_proses =? WHERE id=?",[today,arrakta[i]])
                        })}}
                        res.redirect("home")



})
router.post("/updatestatska",(req,res)=>{
  const {idska,status}= req.body
  db.query("UPDATE data_proses_ska SET status = ? WHERE id =?",[status,idska],(err,result)=>{
    if (err) throw err
    res.render("home.hbs" ,{msg:"SUKSES UPDATE STATUS SKA"})
  })
})

router.post("/updatestatsbu",(req,res)=>{
  const {idsbu,status}= req.body
  db.query("UPDATE data_proses_sbu SET status = ? WHERE id =?",[status,idsbu],(err,result)=>{
    if (err) throw err
    res.render("home.hbs" ,{msg:"SUKSES UPDATE STATUS SBU"})
  })
})

router.post("/deleteinv",(req,res)=>{
  const {idska,idsbu,idk3,idiso,idakta,idinv,no_inv}=req.body
 var today = new Date();
 var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 today = yyyy + '-' + mm + '-' + dd;
  if (idska == "Tidak ada proses") {
    
  }else{
    var arrska = JSON.parse("["+idska+"]")
    for (let i = 0; i < arrska.length; i++) {
      db.query("SELECT * FROM data_proses_ska WHERE id=?",arrska[i],(err,result)=>{
        if (err) throw err
        db.query("INSERT INTO report (nm_client,no_inv,produk,keterangan,harga,tgl_proses,tgl_selesai) VALUES (?,?,?,?,?,?,?)",[result[0].nm_client,no_inv,result[0].service+" "+result[0].klasifikasi,result[0].kode+" a.n "+result[0].nama,result[0].harga,result[0].tgl_proses,today],(err,result)=>{
          if(err)throw err
          db.query("DELETE FROM data_proses_ska WHERE id=?",arrska[i])
        })
      })}}
      //SBU
      if (idsbu == "Tidak ada proses") {
    
      }else{
        var arrsbu =JSON.parse("["+idsbu+"]")
        for (let i = 0; i < arrsbu.length; i++) {
          db.query("SELECT * FROM data_proses_sbu WHERE id= ?",arrsbu[i],(err,result)=>{
            db.query("INSERT INTO report (nm_client,no_inv,produk,keterangan,harga,tgl_proses,tgl_selesai) VALUES (?,?,?,?,?,?,?)",[result[0].nm_client,no_inv,"SBU "+result[0].klasifikasi+" "+result[0].service,result[0].sub+" "+result[0].nbu,result[0].harga,result[0].tgl_proses,today],(err,result)=>{
              if(err)throw err
              db.query("DELETE FROM data_proses_sbu WHERE id=?",arrsbu[i])
            })
          })}}

          //ISO
          if (idiso == "Tidak ada proses") {
    
          }else{
    var arriso = JSON.parse("["+idiso+"]")
            for (let i = 0; i < arriso.length; i++) {
              db.query("SELECT * FROM data_proses_iso WHERE id=? ",arriso[i],(err,result)=>{
                if (err) throw err
                db.query("INSERT INTO report (nm_client,no_inv,produk,keterangan,harga,tgl_proses,tgl_selesai) VALUES (?,?,?,?,?,?,?)",[result[0].nm_client,no_inv,result[0].service+" ISO",result[0].kode+" "+result[0].nbu,result[0].harga,result[0].tgl_proses,today],(err,result)=>{
                  if(err)throw err
                  db.query("DELETE FROM data_proses_iso WHERE id=?",arriso[i])
                })
              })}}

              //K3
              if (idk3 == "Tidak ada proses") {
    
              }else{
                var arrk3 = JSON.parse("["+idk3+"]")
                for (let i = 0; i < arrk3.length; i++) {
                  db.query("SELECT * FROM data_proses_k3 WHERE id= ?",arrk3[i],(err,result)=>{
                    if (err) throw err
                    db.query("INSERT INTO report (nm_client,no_inv,produk,keterangan,harga,tgl_proses,tgl_selesai) VALUES (?,?,?,?,?,?,?)",[result[0].nm_client,no_inv,result[0].service+" "+result[0].pelatihan,result[0].nama,result[0].harga,result[0].tgl_proses,today],(err,result)=>{
                      if(err)throw err
                      db.query("DELETE FROM data_proses_k3 WHERE id=?",arrk3[i])
                    })
                  })}}
                    // AKTA
                    if (idakta == "Tidak ada proses") {
    
                    }else{
                      var arrakta = JSON.parse("["+idakta+"]")
                      for (let i = 0; i < arrakta.length; i++) {
                        db.query("SELECT * FROM data_proses_akta WHERE id= ?",arrakta[i],(err,result)=>{
                          if (err) throw err
                          db.query("INSERT INTO report (nm_client,no_inv,produk,keterangan,harga,tgl_proses,tgl_selesai) VALUES (?,?,?,?,?,?,?)",[result[0].nm_client,no_inv,"AKTA "+result[0].jenis+" "+result[0].service,result[0].nbu,result[0].harga,result[0].tgl_proses,today],(err,result)=>{
                            if(err)throw err
                            db.query("DELETE FROM data_proses_akta WHERE id=?",arrakta[i])
                          })
                        })}}
                        db.query("DELETE FROM inv_cetak_lunas WHERE id=?",idinv)
                        res.redirect("pembayaran")
})
module.exports = router;
