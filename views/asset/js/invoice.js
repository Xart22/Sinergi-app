function tes() {
    var tb = document.getElementById("tb")
    var div = document.getElementById("content")
    var nodelist = div.getElementsByTagName("TR");
    var ttl = document.getElementById("ttl")
    var hsl;
    var i;
    if (nodelist.length > 17) {
        hsl = nodelist.length - 17
        for (i = 0; i < hsl; i++) {
            tb.deleteRow(12)
        } console.log(nodelist.length)
    } else {
        console.log(nodelist.length)
    }
}
var x, i, int, fx, terbil, str;
var re = [],
x = document.querySelectorAll("#harga");
var total = document.getElementById("total")
var hasil = document.getElementById("hasil")
for (i = 0; i < x.length; i++) {
    int = x[i].innerHTML.replace(".", "").replace(".", "")
    fx = parseInt(int)
    re.push(fx)

}
re.reduce(myFunc);

function myFunc(total, num) {
    return total + num;
}
terbil = re.reduce(myFunc)

total.textContent = (new Intl.NumberFormat('ID').format(terbil))
ttl.value = (new Intl.NumberFormat('ID').format(terbil))

hasil.textContent = (terbilang(terbil)) + " RUPIAH"




function terbilang(a) {
    var bilangan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];

    // 1 - 11
    if (a < 12) {
        var kalimat = bilangan[a];
    }
    // 12 - 19
    else if (a < 20) {
        var kalimat = bilangan[a - 10] + ' Belas';
    }
    // 20 - 99
    else if (a < 100) {
        var utama = a / 10;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 10;
        var kalimat = bilangan[depan] + ' Puluh ' + bilangan[belakang];
    }
    // 100 - 199
    else if (a < 200) {
        var kalimat = 'Seratus ' + terbilang(a - 100);
    }
    // 200 - 999
    else if (a < 1000) {
        var utama = a / 100;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 100;
        var kalimat = bilangan[depan] + ' Ratus ' + terbilang(belakang);
    }
    // 1,000 - 1,999
    else if (a < 2000) {
        var kalimat = 'Seribu ' + terbilang(a - 1000);
    }
    // 2,000 - 9,999
    else if (a < 10000) {
        var utama = a / 1000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 1000;
        var kalimat = bilangan[depan] + ' Ribu ' + terbilang(belakang);
    }
    // 10,000 - 99,999
    else if (a < 100000) {
        var utama = a / 100;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = a % 1000;
        var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
    }
    // 100,000 - 999,999
    else if (a < 1000000) {
        var utama = a / 1000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = a % 1000;
        var kalimat = terbilang(depan) + ' Ribu ' + terbilang(belakang);
    }
    // 1,000,000 - 	99,999,999
    else if (a < 100000000) {
        var utama = a / 1000000;
        var depan = parseInt(String(utama).substr(0, 4));
        var belakang = a % 1000000;
        var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
    }
    else if (a < 1000000000) {
        var utama = a / 1000000;
        var depan = parseInt(String(utama).substr(0, 4));
        var belakang = a % 1000000;
        var kalimat = terbilang(depan) + ' Juta ' + terbilang(belakang);
    }
    else if (a < 10000000000) {
        var utama = a / 1000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (a < 100000000000) {
        var utama = a / 1000000000;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = a % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (a < 1000000000000) {
        var utama = a / 1000000000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = a % 1000000000;
        var kalimat = terbilang(depan) + ' Milyar ' + terbilang(belakang);
    }
    else if (a < 10000000000000) {
        var utama = a / 10000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 10000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }
    else if (a < 100000000000000) {
        var utama = a / 1000000000000;
        var depan = parseInt(String(utama).substr(0, 2));
        var belakang = a % 1000000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }

    else if (a < 1000000000000000) {
        var utama = a / 1000000000000;
        var depan = parseInt(String(utama).substr(0, 3));
        var belakang = a % 1000000000000;
        var kalimat = terbilang(depan) + ' Triliun ' + terbilang(belakang);
    }

    else if (a < 10000000000000000) {
        var utama = a / 1000000000000000;
        var depan = parseInt(String(utama).substr(0, 1));
        var belakang = a % 1000000000000000;
        var kalimat = terbilang(depan) + ' Kuadriliun ' + terbilang(belakang);
    }

    var pisah = kalimat.split(' ');
    var full = [];
    for (var i = 0; i < pisah.length; i++) {
        if (pisah[i] != "") { full.push(pisah[i]); }
    }
    return full.join(' ');
}
var rupiah = document.getElementById('dp');
rupiah.addEventListener('keyup', function(e){
    // tambahkan 'Rp.' pada saat ketik nominal di form kolom input
    // gunakan fungsi formatRupiah() untuk mengubah nominal angka yang di ketik menjadi format angka
    rupiah.value = formatRupiah(this.value);
});
/* Fungsi formatRupiah */
function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split           = number_string.split(','),
    sisa             = split[0].length % 3,
    rupiah             = split[0].substr(0, sisa),
    ribuan             = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka satuan ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ?+ rupiah : '');
}
var sisaPem = document.getElementById("sisa")
var dp1 = document.getElementById("dp1")
function potong(){
    var dp3 = document.getElementById("dp3")
    dp3.value = rupiah.value
    dp1.textContent = rupiah.value
    var str = rupiah.value.replace(".", "").replace(".", "")
    var int = parseInt(str)
    var cin = total.textContent.replace(".", "").replace(".", "")
    var parse = parseInt(cin)
    var pp = parse - int;
    hasil.textContent = (terbilang(str)) + " RUPIAH"
sisaPem.textContent = (new Intl.NumberFormat('ID').format(pp));
var sisa = document.getElementById("sisah")
sisa.value = (new Intl.NumberFormat('ID').format(pp));
}
function tbh(){
    var tb = document.getElementById("tb")
    var row = tb.insertRow(10)
    var cell = row.insertCell(0),
        cell1 =row.insertCell(1),
        cell2 = row.insertCell(2),
        cell3 = row.insertCell(3)
    cell.innerHTML =""
    cell1.innerHTML =""
    cell2.innerHTML =""
    cell3.innerHTML =""
    
}
function remove(el) {
    var element = el;
    var txt;
    var res;
    var int;
    var hsl
    var pog = total.textContent.replace(".", "").replace(".", "")
    var par = parseInt(pog)
    if (confirm("Delete Produk ?")) {
      txt = "Ok!";
      int =element.lastElementChild.innerHTML.replace(".", "").replace(".", "")
      res = parseInt(int)
      hsl = par - res
      console.log(hsl)
      ttl.value = (new Intl.NumberFormat('ID').format(hsl))
      total.textContent = (new Intl.NumberFormat('ID').format(hsl))
      hasil.textContent = (terbilang(hsl)) + " RUPIAH"
      element.remove();
      tbh()
    } else {
      txt = "Cancel!";
    }
  }

  $("#createNo").on("submit", function (e) {
    $.ajax({
      type: "POST",
      url: "/createNo",
      success: function () {
        $.getJSON('http://sinergi-tes.herokuapp.com/no_invoice', function(data) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            var no = data[0].id+'/INV/'+mm+'/'+yyyy
            $("#ppp").append('<strong>INVOICE NO.</strong> &nbsp;'+no)
            $('#pp').append("<strong>DATE</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+today)
            $('#inv').val(no)
        });
        
      }
    });
    e.preventDefault();
    });
    
  $("#saveinv").on("submit", function (e) {
    $.ajax({
      type: "POST",
      data: $("#saveinv").serialize(),
      url: "/saveinv",
      success: function () {
        $.getJSON('http://sinergi-tes.herokuapp.com/no_invoice', function(data) {
            window.print()
        });
        
      }
    });
    e.preventDefault();
    });


