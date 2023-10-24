function cekbulat(n){
    return n==Math.round(n)
};
function cekBilKuadrat(n){
    return cekbulat(Math.sqrt(n))
}
// Copyright (c) 2011 Alexei Kourbatov, www.JavaScripter.net 

// function FaktorTerkecil(n) returns:
// * the smallest prime that divides n
// * NaN if n is NaN or Infinity
// *  0  if n is 0
// *  1  if n=1, n=-1, or n is not an integer

FaktorTerkecil = function(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;  
    if (n==0) return 0;  
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;  
    if (n%3==0) return 3;  
    if (n%5==0) return 5;  
    let m = Math.sqrt(n);
    for (let i=7;i<=m;i+=30) {
     if (n%i==0)      return i;
     if (n%(i+4)==0)  return i+4;
     if (n%(i+6)==0)  return i+6;
     if (n%(i+10)==0) return i+10;
     if (n%(i+12)==0) return i+12;
     if (n%(i+16)==0) return i+16;
     if (n%(i+22)==0) return i+22;
     if (n%(i+24)==0) return i+24;
    }
    return n;
   }
   
   // Optimized version of FaktorTerkecil for Opera, Chrome, Firefox.
   // In these browsers, "i divides n" is much faster as
   // (q=n/i)==Math.floor(q)  than  n%i==0
   if (
       navigator.userAgent.indexOf('Opera')  !=-1
    || navigator.userAgent.indexOf('Chrome') !=-1
    || navigator.userAgent.indexOf('Firefox')!=-1 )
   {
    FaktorTerkecil = function(n) {
     if (isNaN(n) || !isFinite(n)) return NaN;   
     if (n==0) return 0;  
     if (n%1 || n*n<2) return 1;
     if (n%2==0) return 2;  
     if (n%3==0) return 3;  
     if (n%5==0) return 5;  
     let q, m = Math.sqrt(n);
     for (let i=7;i<=m;i+=30) {
      if ((q=n/i)==Math.floor(q))      return i;
      if ((q=n/(i+4))==Math.floor(q))  return i+4;
      if ((q=n/(i+6))==Math.floor(q))  return i+6;
      if ((q=n/(i+10))==Math.floor(q)) return i+10;
      if ((q=n/(i+12))==Math.floor(q)) return i+12;
      if ((q=n/(i+16))==Math.floor(q)) return i+16;
      if ((q=n/(i+22))==Math.floor(q)) return i+22;
      if ((q=n/(i+24))==Math.floor(q)) return i+24;
     }
     return n;
    }
   }
   
   // Optimized version for Internet Explorer avoids IE's 
   // "slow script" warning at 5000000 script statements
   // by grouping 48 divisibility checks into a single statement
   
   if (navigator.userAgent.indexOf('MSIE')!=-1)
   {
    FaktorTerkecil = function(n){
     if (isNaN(n)) return NaN;  
     if (n==0) return 0;  
     if (!isFinite(n) || n%1 || n*n<2) return 1;
     if (n%2==0) return 2;  
     if (n%3==0) return 3;  
     if (n%5==0) return 5;  
     if (n%7==0) return 7;  
     let m = Math.sqrt(n);
     for (let i=11;i<=m;i+=210) {
      if (n%i && n%(i+2) && n%(i+6) && n%(i+8)&& n%(i+12)&& n%(i+18)&& n%(i+20)&& n%(i+26)
      && n%(i+30) && n%(i+32) && n%(i+36) && n%(i+42) && n%(i+48) && n%(i+50) && n%(i+56)
      && n%(i+60) && n%(i+62) && n%(i+68) && n%(i+72) && n%(i+78) && n%(i+86)
      && n%(i+90) && n%(i+92) && n%(i+96) && n%(i+98) && n%(i+102)&& n%(i+110)&& n%(i+116)
      && n%(i+120)&& n%(i+126)&& n%(i+128)&& n%(i+132)&& n%(i+138)&& n%(i+140)&& n%(i+146)
      && n%(i+152)&& n%(i+156)&& n%(i+158)&& n%(i+162)&& n%(i+168)&& n%(i+170)&& n%(i+176)
      && n%(i+180)&& n%(i+182)&& n%(i+186)&& n%(i+188)&& n%(i+198)&& n%(i+200)
      ) continue;
      for (let j=0;j<210;j+=2) {if (n%(i+j)==0) return i+j; }
     }
     return n;
    }
   }
   
   // function cekPrima(n) returns:
   // - false if n is NaN or not a finite integer
   // - true  if n is prime
   // - false otherwise
   
   cekPrima = function(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n==FaktorTerkecil(n)) return true;
    return false;
   }
   
   // function faktor(n) returns:
   // * a string containing the prime factorization of n
   // * n.toString() if the factrization cannot be found
   
   function faktor(n){
    if (isNaN(n) || !isFinite(n) || n%1 || n==0) return n.toString();
    if (n<0) return '-'+faktor(-n);
    let minFactor = FaktorTerkecil(n);
    if (n==minFactor) return n.toString();
    return minFactor+'*'+faktor(n/minFactor);
   }
   
   // function primaBerikutnya(n) returns:
   // * the smallest prime greater than n
   // * NaN if this prime is not a representable integer
   
   function primaBerikutnya(n){
    if (isNaN(n) || !isFinite(n)) return NaN; 
    if (n<2) return 2;
    n = Math.floor(n);
    for (let i=n+n%2+1; i<9007199254740992; i+=2) {
     if (cekPrima(i)) return i;
    }
    return NaN;
   }
   
   // function primaKembarBerikutnya(n) returns:
   // * 2 if n<2 or
   // * 3 if n<3 or
   // * 5 if n<5 or
   // * the smallest twin prime 6i-1 greater than n, for an integer i
   // * NaN if such a prime is not a representable integer
   
   function primaKembarBerikutnya(n) {
    if (isNaN(n) || !isFinite(n)) return NaN; 
    if (n<2) return 2;
    if (n<3) return 3;
    if (n<5) return 5;
    for (let i=6*Math.ceil(Math.floor(n+2)/6); i<9007199254740880; i+=6) {
     if (pscreen(i-1) && pscreen(i+1) && cekPrima(i-1) && cekPrima(i+1))
       return i-1;
    }
    return NaN;
   }
   
   // function primaKuadratBerikutnya(n) returns:
   // * the smallest prime in the next prime quadruplet greater than n
   // * NaN if such a prime is not a representable integer
   
   function primaKuadratBerikutnya(n) {
    if (isNaN(n) || !isFinite(n)) return NaN; 
    if (n<11) return 11;
    for (let i=30*Math.ceil(Math.floor(n-10)/30); i<9007199254740880; i+=30) {
     if (pscreen(i+11) && pscreen(i+13) && pscreen(i+17) && pscreen(i+19)
      && cekPrima(i+11) && cekPrima(i+13) && cekPrima(i+17) && cekPrima(i+19))
       return i+11;
    }
    return NaN;
   }
   
   function pscreen(n) {
    if (n<=19 || n%3 && n%5 && n%7 && n%11 && n%13 && n%17 && n%19) return true;
    return false;
   }

   function pembagi(n) {
    if (n < 1)
        throw "Argument error";
    let small = [];
    let large = [];
    let end = Math.floor(Math.sqrt(n));
    for (let i = 1; i <= end; i++) {
        if (n % i == 0) {
            small.push(i);
            if (i * i != n)  // Don't include a square root twice
                large.push(n / i);
        }
    }
    large.reverse();
    return small.concat(large);
}

function faktorial(n){
    if(n==0){
        return 1
    }else{
        return n*faktorial(n-1)
    }
};

function primeFactorList(n) {
    if (n < 1)
        throw "Argument error";
    let result = [];
    while (n != 1) {
        let factors = FaktorTerkecil(n);
        result.push(factors);
        n /= factors;
    }
    return result;
}

function fpb2(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  function fpb (a) {
    return a.reduce(fpb2)
  }

  function kpk2(a,b){
      return (a*b)/fpb2(a,b)
  }
  function kpk(x){
      return x.reduce(kpk2)
  }
  function FaktorBilKuadrat(n){
      let indeksFaktorBilKuadrat = Math.floor(Math.sqrt(n));
      while (indeksFaktorBilKuadrat>1) {
          let m2 = n%Math.pow(indeksFaktorBilKuadrat,2);
          if(m2==0){
              break;
          }else{indeksFaktorBilKuadrat--}
      }
      return indeksFaktorBilKuadrat;
  }

  function diskriminan(a,b,c){
      return b*b-4*a*c
  }
  
  //memilih bilangan bulat dari 0 hingga n
  function bilbulacak(n){
      return Math.floor(Math.random()*n)
  }

//determinan matriks
function det2(a11,a12,a21,a22){
    return a11*a22-a12*a21
}

function minorsebagian(matriks=[],baris=1,kolom=1){
    let hasil = JSON.parse(JSON.stringify(matriks));
    hasil.splice(baris-1,1);
    for(let i=0;i<hasil.length;i++){
        hasil[i].splice(kolom-1,1);
    }
    return hasil;
}

function det(matriks=[]){
    if(matriks.length==2){
       return matriks[0][0]*matriks[1][1]-matriks[0][1]*matriks[1][0]
    }else{
       let a=[];
       let hasil=0;
       for(let i=0;i<matriks[0].length;i++){
          a[i]=Math.pow(-1,i)*matriks[0][i];
          hasil+=a[i]*minor(matriks,1,i+1);
       }
       return hasil;
    }
 }

function minor(matriks=[],baris=1,kolom=1){
    return det(minorsebagian(matriks,baris,kolom));
}

function matriksminor(matriks=[]){
    let hasil = [];
    for(let i=0;i<matriks.length;i++){
        hasil[i]=[];
        for(let k=0;k<matriks.length;k++){
            hasil[i][k]=minor(matriks,i+1,k+1)
        }
    }
    return hasil;
}

function matrikskofaktor(matriks=[]){
    let hasil = matriksminor(matriks);
    for(let i=0;i<hasil.length;i++){
        for(let j=0;j<hasil.length;j++){
            hasil[i][j]=Math.pow(-1,i+j)*hasil[i][j]
        }
    }
    return hasil;
}

function transpose(matriks=[]){
    let hasil = [];
    for(let i=0;i<matriks[0].length;i++){
        hasil[i]=[];
        for(let j=0;j<matriks.length;j++){
            hasil[i][j]=matriks[j][i]
        }
    }
    return hasil;
}

function adjoin(matriks=[]){
    let hasil = []
    if(matriks.length==2){
        hasil = [[matriks[1][1],-matriks[0][1]],[-matriks[1][0],matriks[0][0]]]
    }else{hasil = transpose(matrikskofaktor(matriks))}
    return hasil;
}

function kalimatriks(matriksatauskalar,matriks){
    let hasil = []
    if(Array.isArray(matriksatauskalar)){
        for(let i=0;i<matriksatauskalar.length;i++){
            hasil[i]=[]
            for(let j=0;j<matriks[0].length;j++){
                hasil[i][j]=0;
                for(let k=0;k<matriksatauskalar[0].length;k++)
                hasil[i][j]+=matriksatauskalar[i][k]*matriks[k][j]
            }
        };
    }
    if(typeof matriksatauskalar=="number"){
        hasil = JSON.parse(JSON.stringify(matriks));
        for(let i=0;i<hasil.length;i++){
            for(let j=0;j<hasil[0].length;j++){
                hasil[i][j]=matriksatauskalar*hasil[i][j]
            }
        }
    }
    return hasil
}
function matriksinvers(matriks=[]){
    let hasil = adjoin(matriks);
    for(let i=0;i<hasil.length;i++){
        for(let j=0;j<hasil.length;j++){
            hasil[i][j] = hasil[i][j]/det(matriks)
        }
    }
    return hasil
}

//Bentuk matriks
function bentukMatriks(matriks=[]){
    let hasil = String.raw`\begin{pmatrix}`;
    for (let i = 0; i < matriks.length; i++) {
        for (let j = 0; j < matriks[0].length; j++) {
            hasil += matriks[i][j]
            if (j!=matriks[0].length-1) {
                hasil += String.raw`&`
            }
        }
        if (i!=matriks.length-1) {
            hasil+=String.raw`\\`
        }else{hasil+=String.raw`\end{pmatrix}`}
    }
    return hasil;
}

 function jumlah2(a,b){
    return a+b;
  }
  function jumlah(n){
    return n.reduce(jumlah2)
  }

  function jumlahkuadrat2(a=0,b=0){
      return a*a+b*b
  }

  function jumlahkuadrat(x=[]){
      return x.reduce(jumlahkuadrat2)
  }

  function panjangvektor(vektor=[]){
      let pjg=0;
      for(let i=0;i<vektor.length;i++){
          pjg+=vektor[i]*vektor[i]
      }
      return Math.sqrt(pjg);
  }

  function dotvektor(vektor1,vektor2){
      let hasil = 0;
      for(let i=0;i<vektor1.length;i++){
          hasil+=vektor1[i]*vektor2[i]
      }
      return hasil;
  }

  function crossvektor(vektor1,vektor2){
      let matriksSementara = [];
      matriksSementara[0]=[1,-1,1];
      matriksSementara[1]=vektor1;
      matriksSementara[2]=vektor2;
      let hasil = [];
      for(let i=0;i<3;i++){
        hasil[i]=Math.pow(-1,i)*minor(matriksSementara,1,i+1);
      }
      return hasil;
  }

  function proyvekt(vektorasal,vektortuju){
      let konst = dotvektor(vektorasal,vektortuju)/Math.pow(panjangvektor(vektortuju),2);
      let hasil = vektortuju.slice(0);
      for(let i=0;i<vektortuju.length;i++){
          hasil[i]=konst*hasil[i]
      }
      return hasil
  }

  function sederhanakanAkar(n){
      let a;
      let b;
      let c;
      let d;
      let list=[];
      if(cekBilKuadrat(n)){
          a=Math.sqrt(n);
          b="";
          c="";
          d="";
      }
      else{
          a = Math.floor(Math.sqrt(n));
          while(n%(Math.pow(a,2))!=0){
              a=a-1;
          }
          b = n/(a*a);
          if(a==1){a=""};
          c=String.raw`\sqrt{`;
          d="}";
      }
      return [a,b,c,d]
  }
  function teksSederhanakanAkar(n){
      let m = sederhanakanAkar(n);
      return String.raw`${m[0]}${m[2]}${m[1]}${m[3]}`;
  }

  function ac(angka){
    return Math.floor(Math.random()*angka)
}

function acan(angkapertama=0,angkakedua=1){
    angkakedua = angkakedua ?? angkapertama+1
    return angkapertama+ac(angkakedua-angkapertama+1)
}

function plusminus(){
    return Math.pow(-1,ac(2))
}

function plmi(n=0){
    return plusminus()*n
}

function pecahan(pembilang,penyebut){
    let faktor = fpb2(pembilang,penyebut)
    if(faktor==penyebut){
      return pembilang/penyebut
    }else{return String.raw`\dfrac{${pembilang/faktor}}{${penyebut/faktor}}`}
  }
  function koef(n=0){
      if(n==1){
          return ""
      }else if(n==-1){
        return "-"
      }else{return n}
  }
  function tanda1(n){
    if(n<0){
      return n
    }else{return `+${n}`}
  }
  function tanda2(n){
    if(n==-1){
        return `&minus; `;
    }
    else if(n==1){
        return "+ ";
    }
    else if(n<0){
      return `&minus; ${Math.abs(n)}`
    }else{return `+ ${n}`}
  }

  function tanda3(n=0){
      if(n==-1){
          return `&minus;`;
      }
      else if(n==1){
          return "";
      }
    else if(n<0){
        return `&minus;${Math.abs(n)}`
      }else{return `${n}`}
  }
  function tanda4(n=0){
    if(n==0){
        return ""
    }else{
        return tanda1(n)
    }
  }

  var min9sampai9tanpa0 = [];
for(let i=-9;i<10;i++){
    if(i!==0){
        min9sampai9tanpa0.push(i)
    }
}
function konst(n){
    if(n==0){
        return "";
    }
    else{
        return tanda1(n)
    }
}
function kurmin(angka=0){
  if(angka>=0){
    return angka
  }else{return `(${angka})`}
}

//membuat array berisi bilangan bulat dari batasbawah hingga batasatas
const arraybilbul = (batasbawah=0,batasatas=batasbawah+1) => {
    let hasil = [];
    for (let i = batasbawah; i < batasatas+1; i++) {
        hasil.push(i)
    }
    return hasil
}

//memilih sebagian elemen dari array arr dan tetap terurut
function pilihSebagian(arr=[],num=1){
    const res = [];
    let indeks = [];
    let arr2 = arraybilbul(0,arr.length-1);
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr2.length);
       indeks.push(arr2[random]);
       arr2.splice(random,1);
       i++;
    };
    indeks.sort(function(a,b){return a-b});
    for (let i = 0; i < indeks.length; i++) {
        res[i] = arr[indeks[i]];
    }
    return res;
}

//memilih sebagian elemen dari array arr kemudian posisinya diacak
const pilihacak = (arr, num = 1) => {
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[random]) !== -1){
          continue;
       };
       res.push(arr[random]);
       i++;
    };
    return res;
 };

 //mengacak urutan elemen pada array
 function acakarray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  //shortcut untuk Math.sin
  function sin(x=0){
    return Math.sin(x*Math.PI/180);
  }

  //shortcut untuk Math.cos
  function cos(x=0){
    return Math.cos(x*Math.PI/180);
  }

    //shortcut untuk Math.tan
    function tan(x=0){
        return Math.tan(x*Math.PI/180);
      }

  //membuat tabel dari array
  function buattabelsoal(arr=[],tempattabel="",opsi={}){
    let bykbaris = arr.length;
    let bykkolom = arr[0].length;
    let teks = String.raw`<table class='w3-table-all tengah'>
        <thead>
            <th>NO</th><th>SOAL</th><th>SOLUSI</th>
        </thead>
        <tbody>`;
    for (let i = 0; i < arr.length; i++) {
        teks += String.raw`<tr><td class="w3-deep-orange" style="font-size: 40px; text-align: left">${i+1}</td><td style="text-align: justify">${arr[i][0]}</td><td><div id="qrc${i}"></div><div style="text-align: center">${arr[i][1]}</div></td></tr>`;
    };
    teks += String.raw`</tbody></table>`;
    document.getElementById(tempattabel).innerHTML = teks;
    let lebarqr = opsi.lebarqr || 100;
    let tinggiqr = opsi.tinggiqr || 100;
    let warnaqr = opsi.warnaqr || "#000000";
    let qrkode = [];
    for (let i = 0; i < arr.length; i++) {
        qrkode[i]=new QRCode("qrc"+i, {
        text: String.raw`https://n9.cl/${arr[i][1]}`,
        width: lebarqr,
        height: tinggiqr,
        colorDark : warnaqr,
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
      }
  }

  function svgawal(lebar=0,tinggi=0,rasio=1,margin=0){
    return String.raw`<svg xmlns='http://www.w3.org/2000/svg' style='max-width: ${rasio*(lebar+2*margin)}px; max-height: ${rasio*(tinggi+2*margin)}px;' viewbox='${-margin} ${-margin} ${lebar+2*margin} ${tinggi+2*margin}'>`;
  }
  function svgkoord(intervalx=[0,0],intervaly=[0,0],opsi={}){
    var lebar = Math.abs(intervalx[1]-intervalx[0]);
    var tinggi = Math.abs(intervaly[1]-intervaly[0]);
    var rasio = opsi.rasio || 1;
    var ukuranhuruf = opsi.ukuranhuruf || 1;
    var wm = opsi.wm || false;
    var wmteks = opsi.wmteks || "matematikaidhamdaz.blogspot.com";
    var wmsize = opsi.wmsize || 1;
    var wmtampak = opsi.wmtampak || 1;
    var teks = "";
    var tick = "";
    for (let i = intervalx[0]+1; i < intervalx[1]; i++) {
        if(i!=0){
            tick+=String.raw`<line x1="${i}" y1="0"
            x2="${i}" y2="${3/(rasio*16)}"
            stroke="black"
            stroke-width="${1/(rasio*16)}"/>
            <text x="${i}"  y="${5/(rasio*16)}"  text-anchor="middle" dominant-baseline="hanging" style="font-family:'Times New Roman', Times, serif; font-size:${0.7*ukuranhuruf/(rasio*16)}em">${i}</text>`
        }
    }
    for (let i = -intervaly[1]+1; i < -intervaly[0]; i++) {
        if(i!=0){
            tick+=String.raw`<line x1="0" y1="${i}"
            x2="${-3/(rasio*16)}" y2="${i}"
            stroke="black"
            stroke-width="${1/(rasio*16)}"/>
            <text x="${-5/(rasio*16)}"  y="${i}"  text-anchor="end" dominant-baseline="central" style="font-family:'Times New Roman', Times, serif; font-size:${0.7*ukuranhuruf/(rasio*16)}em">${-i}</text>`
        }
    }
    if(wm==true){
        teks = String.raw`<text x="${(intervalx[0]+intervalx[1])/2}"  y="${(intervaly[0]+intervaly[1])/2}"  text-anchor="middle" dominant-baseline="central" fill-opacity="${wmtampak}" transform="rotate(-45 ${(intervalx[0]+intervalx[1])/2} ${(intervaly[0]+intervaly[1])/2})" style="font-family:'Times New Roman', Times, serif; font-size:${0.8*wmsize/(rasio*16)}em">${wmteks}</text>`;
    }
    return String.raw`<svg xmlns='http://www.w3.org/2000/svg' style='max-width: ${(rasio*16)*(lebar)}px; max-height: ${(rasio*16)*(tinggi)}px;' viewbox='${intervalx[0]} ${-intervaly[1]} ${lebar} ${tinggi}'>
    <defs>
              <!-- arrowhead marker definition -->
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
          
              <!-- simple dot marker definition -->
              <marker
                id="dot"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="5"
                markerHeight="5">
                <circle cx="5" cy="5" r="5" fill="red" />
              </marker>
            </defs>
          
            <!-- Coordinate axes with an arrowhead in both directions -->
            
    <line x1="${intervalx[0]}" y1="0"
    x2="${intervalx[1]}" y2="0"
    stroke="black"
    stroke-width="${1/(rasio*16)}" marker-end="url(#arrow)"/>
    <line x1="0" y1="${-intervaly[0]}"
    x2="0" y2="${-intervaly[1]}"
    stroke="black"
    stroke-width="${1/(rasio*16)}" marker-end="url(#arrow)"/>
    <text x="${intervalx[1]}"  y="${4/(rasio*16)}"  text-anchor="end" dominant-baseline="hanging" style="font-family:'Times New Roman', Times, serif; font-size:${0.8*ukuranhuruf/(rasio*16)}em">&#119883;</text>
    <text x="${-4/(rasio*16)}"  y="${-intervaly[1]}"  text-anchor="end" dominant-baseline="hanging" style="font-family:'Times New Roman', Times, serif; font-size:${0.8*ukuranhuruf/(rasio*16)}em">&#119884;</text>
    ${teks}
    ${tick}`;
  }
  function svggaris(garis=[],opsi={}){
    let tbl = opsi.tebalgaris || 1;
    let warna = opsi.warna || "black";
    let dash = opsi.dash || "";
    let tampakgaris = opsi.tampakgaris || 1;
    return String.raw`<line x1="${garis[0][0]}" y1="${garis[0][1]}"
    x2="${garis[1][0]}" y2="${garis[1][1]}"
    stroke="${warna}"
    stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}"/>`
  }
  function svgsegi(kumpulantitik=[],opsi={}){
    let listtitik = `${kumpulantitik[0][0]},${kumpulantitik[0][1]} `;
    for (var i = 1; i < kumpulantitik.length; i++) {
        listtitik += String.raw`${kumpulantitik[i][0]},${kumpulantitik[i][1]} `;
      }
      let warnagaris = opsi.warnagaris || "black";
      let isi = opsi.isi || "none";
      let transparanisi = opsi.tampakisi || 1;
      let tampakgaris = opsi.tampakgaris || 1;
      let tebalgaris = opsi.tebalgaris || 1;
      return String.raw`<polygon points="${listtitik}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}"/>`;
  }
  function panjanggaris(garis=[]){
    return Math.sqrt((garis[1][0]-garis[0][0])*(garis[1][0]-garis[0][0])+(garis[1][1]-garis[0][1])*(garis[1][1]-garis[0][1]))
  }
  function svgsudut(arr=[],opsi={}){
    let r = opsi.r || 1;
    let tebalgaris = opsi.tebalgaris || 1;
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let rotasi = opsi.rotasi || 0;
    let busurbesar = opsi.busurbesar || 0;
    let arah = opsi.arah || 1;
    return String.raw`<path d="M ${arr[1][0]} ${arr[1][1]} L ${arr[1][0]+r*(arr[0][0]-arr[1][0])/panjanggaris([arr[0],arr[1]])} ${arr[1][1]+r*(arr[0][1]-arr[1][1])/panjanggaris([arr[0],arr[1]])} A ${r} ${r} ${rotasi} ${busurbesar} ${arah} ${arr[1][0]+r*(arr[2][0]-arr[1][0])/panjanggaris([arr[2],arr[1]])} ${arr[1][1]+r*(arr[2][1]-arr[1][1])/panjanggaris([arr[2],arr[1]])} z" stroke="${warnagaris}" fill="${isi}" fill-opacity="${tampakisi}" stroke-width="${tebalgaris}" stroke-opacity:"${tampakgaris}"/>`;
  }
  function svgsiku(arr=[],opsi={}){
    let r = opsi.r || 1;
    let tebalgaris = opsi.tebalgaris || 1;
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakisi = opsi.tampakisi || 1;
    let tampakgaris = opsi.tampakgaris || 1;
    let ti1x = arr[0][0];
    let ti1y = arr[0][1];
    let ti2x = arr[1][0];
    let ti2y = arr[1][1];
    let ti3x = arr[2][0];
    let ti3y = arr[2][1];
    let pjg1 = panjanggaris([arr[0],arr[1]]);
    let pjg2 = panjanggaris([arr[2],arr[1]]);
    let tiawal = [ti2x+r*(ti1x-ti2x)/pjg1,ti2y+r*(ti1y-ti2y)/pjg1];
    let tiakh = [ti2x+r*(ti3x-ti2x)/pjg2,ti2y+r*(ti3y-ti2y)/pjg2];
    let titeng = [(tiawal[0]+tiakh[0])/2,(tiawal[1]+tiakh[1])/2];
    let tilu = [2*titeng[0]-arr[1][0],2*titeng[1]-arr[1][1]]
    return String.raw`<polygon points="${ti2x},${ti2y} ${tiawal[0]},${tiawal[1]} ${tilu[0]},${tilu[1]} ${arr[1][0]+r*(arr[2][0]-arr[1][0])/panjanggaris([arr[2],arr[1]])},${arr[1][1]+r*(arr[2][1]-arr[1][1])/panjanggaris([arr[2],arr[1]])}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${tampakisi}; stroke-opacity:${tampakgaris}"/>`;
  }
  function svglabelgaris(garis=[],namalabel="A",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let warna = opsi.warna || "black";
    return String.raw`<text x="${(garis[0][0]+garis[1][0])/2+xplus}"  y="${(garis[0][1]+garis[1][1])/2+yplus}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran}em; fill:${warna}">${namalabel}</text>`;
  }

  function svglabeltitik(titik=[0,0],namalabel="A",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    return String.raw`<text x="${titik[0]+xplus}"  y="${titik[1]+yplus}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran}em">${namalabel}</text>`;
  }

  function titikpotong(garis1=[],garis2=[]){
    let x1 = garis1[0][0];
    let y1 = garis1[0][1];
    let x2 = garis1[1][0];
    let y2 = garis1[1][1];
    let x3 = garis2[0][0];
    let y3 = garis2[0][1];
    let x4 = garis2[1][0];
    let y4 = garis2[1][1];
    let m1 = (y2-y1)/(x2-x1);
    let m2 = (y4-y3)/(x4-x3);
    let xtipot = (-m1*x1+m2*x3+y1-y3)/(m2-m1);
    let ytipot = (-m1*m2*x1+m1*m2*x3+m2*y1-m1*y3)/(m2-m1);
    if(x1==x2){
        xtipot = x1;
        ytipot = y3+m2*(xtipot-x3);
    }    
    if(x3==x4){
        xtipot = x3;
        ytipot = y1+m1*(xtipot-x1);
    }
    return [xtipot,ytipot]
  }

  function titiktengah(garis=[]){
    let xA = garis[0][0];
    let yA = garis[0][1];
    let xB = garis[1][0];
    let yB = garis[1][1];
    let x = (xA+xB)/2;
    let y = (yA+yB)/2;
    return [x,y]
  }
  function titikpadagaris(garis=[],perbandingan=1/1){
    let xA = garis[0][0];
    let xB = garis[1][0];
    let yA = garis[0][1];
    let yB = garis[1][1];
    let x = (perbandingan*xB+xA)/(perbandingan+1);
    let y = (perbandingan*yB+yA)/(perbandingan+1);
    return [x,y]
  }

  function svglingkaran(titikpusat=[0,0],jarijari=1,options={}){
    let isi = options.isi || "none";
    let warnagaris = options.warnagaris || "black";
    let dash = options.dash || "";
    let tampakisi = options.tampakisi || 1;
    let tampakgaris = options.tampakgaris || 1;
    let tebalgaris = options.tebalgaris || 1;
    return String.raw`<circle cx="${titikpusat[0]}" cy="${titikpusat[1]}" r="${jarijari}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; stroke-dasharray:${dash}; fill: ${isi}; fill-opacity:${tampakisi}; stroke-opacity:${tampakgaris}"/>`;
  }
  function svgkling(titikpusat=[0,0],jarijari=1,options={}){
    let isi = options.isi || "none";
    let warnagaris = options.warnagaris || "black";
    let dash = options.dash || "";
    let tampakisi = options.tampakisi || 1;
    let tampakgaris = options.tampakgaris || 1;
    let tebalgaris = options.tebalgaris || 1;
    return String.raw`<circle cx="${titikpusat[0]}" cy="${-titikpusat[1]}" r="${jarijari}" style="stroke:${warnagaris}; stroke-width:${tebalgaris/16}; stroke-dasharray:${dash}; fill: ${isi}; fill-opacity:${tampakisi}; stroke-opacity:${tampakgaris}"/>`;
  }
  function svgksegi(kumpulantitik=[],opsi={}){
    let listtitik = `${kumpulantitik[0][0]},${-kumpulantitik[0][1]} `;
    for (var i = 1; i < kumpulantitik.length; i++) {
        listtitik += String.raw`${kumpulantitik[i][0]},${-kumpulantitik[i][1]} `;
      }
      let warnagaris = opsi.warnagaris || "black";
      let isi = opsi.isi || "none";
      let transparanisi = opsi.tampakisi || 1;
      let tampakgaris = opsi.tampakgaris || 1;
      let tebalgaris = opsi.tebalgaris || 1;
      let rasio = opsi.rasio || 1;
      return String.raw`<polygon points="${listtitik}" style="stroke:${warnagaris}; stroke-width:${tebalgaris/(rasio*16)}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}"/>`;
  }
  function svgkgaris(garis=[],opsi={}){
    let tbl = opsi.tebalgaris || 1;
    let warna = opsi.warna || "black";
    let dash = opsi.dash || "";
    let rasio = opsi.rasio || 1;
    return String.raw`<line x1="${garis[0][0]}" y1="${-garis[0][1]}"
    x2="${garis[1][0]}" y2="${-garis[1][1]}"
    stroke="${warna}"
    stroke-width="${tbl/(rasio*16)}" stroke-dasharray="${dash}"/>`
  }
  function svgklabeltitik(titik=[0,0],namalabel="A",opsi={}){
    let ukuran = opsi.ukuran || 0.7;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let rasio = opsi.rasio || 1;
    return String.raw`<text x="${titik[0]+xplus/(rasio*16)}"  y="${-titik[1]-yplus/(rasio*16)}" text-anchor="${anchor}" dominant-baseline="${baseline}" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran/(rasio*16)}em">${namalabel}</text>`;
  }
  function svgklabelgaris(garis=[],namalabel="A",opsi={}){
    let ukuran = opsi.ukuran || 1;
    let anchor = opsi.anchor || "start";
    let baseline = opsi.baseline || "auto";
    let xplus = opsi.xplus || 0;
    let yplus = opsi.yplus || 0;
    let warna = opsi.warna || "black";
    let rasio = opsi.rasio || 1;
    let rotasi = opsi.rotasi || 0;
    return String.raw`<text x="${(garis[0][0]+garis[1][0])/2+xplus/(rasio*16)}"  y="${-(garis[0][1]+garis[1][1])/2-yplus/(rasio*16)}" text-anchor="${anchor}" dominant-baseline="${baseline}" transform="rotate(${rotasi} ${(garis[0][0]+garis[1][0])/2} ${-(garis[0][1]+garis[1][1])/2})" style="font-family:'Times New Roman', Times, serif; font-size:${ukuran/(rasio*16)}em; fill:${warna}">${namalabel}</text>`;
  }
function svgkfungkuad(koef=[],intervalx=[],opsi={}){
    let a = -koef[0];
    let b = -koef[1];
    let c = -koef[2];
    let x0 = intervalx[0];
    let y0 = a*x0*x0+b*x0+c;
    let x2 = intervalx[1];
    let y2 = a*x2*x2+b*x2+c;
    let m1 = 2*a*x0+b;
    let m2 = 2*a*x2+b;
    let x1 = (-m1*x0 + m2*x2 + y0 - y2)/(m2-m1);
    let y1 = (-m1*m2*x0 + m1*m2*x2 + m2*y0 - m1*y2)/(m2-m1);
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakgaris = opsi.tampakgaris || 1;
    let tampakisi = opsi.tampakisi || 1;
    let tebal = opsi.tebalgaris || 1;
    let rasio = opsi.rasio || 1;
    return String.raw`<path d="M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}" stroke="${warnagaris}" fill="${isi}" stroke-width="${tebal/(rasio*16)}" stroke-opacity="${tampakgaris}" fill-opacity="${tampakisi}"/>`;
}
function svgkkurvaL(f,interval=[],iterasi=1,opsi={}){
    let x0 = interval[0];
    let y0 = -f(x0);
    let xn = interval[1];
    let xk = [];
    let yk = [];
    for (let i = 0; i < iterasi; i++) {
        xk[i]=x0+(i+1)*(xn-x0)/iterasi;
        yk[i] = -f(xk[i])
    }
    let teksQ = "";
    for (let i = 0; i < xk.length; i++) {
        teksQ += ` L ${xk[i]} ${yk[i]}`
        
    }
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "none";
    let tampakgaris = opsi.tampakgaris || 1;
    let tampakisi = opsi.tampakisi || 1;
    let tebal = opsi.tebalgaris || 1;
    let rasio = opsi.rasio || 1;
    return String.raw`<path d="M ${x0} ${y0}${teksQ}" stroke="${warnagaris}" fill="${isi}" stroke-width="${tebal/(rasio*16)}" stroke-opacity="${tampakgaris}" fill-opacity="${tampakisi}"/>`;
}
function svgkareakurvaL(f,interval=[],iterasi=1,opsi={}){
    let x0 = interval[0];
    let y0 = -f(x0);
    let xn = interval[1];
    let xk = [];
    let yk = [];
    for (let i = 0; i < iterasi; i++) {
        xk[i]=x0+(i+1)*(xn-x0)/iterasi;
        yk[i] = -f(xk[i])
    }
    let teksL = "";
    for (let i = 0; i < xk.length; i++) {
        teksL += ` L ${xk[i]} ${yk[i]}`
        
    }
    let warnagaris = opsi.warnagaris || "black";
    let isi = opsi.isi || "black";
    let tampakgaris = opsi.tampakgaris || 1;
    let tampakisi = opsi.tampakisi || 1;
    let tebal = opsi.tebalgaris || 1;
    let rasio = opsi.rasio || 1;
    return String.raw`<path d="M ${x0} 0 L ${x0} ${y0}${teksL} L ${xn} 0 z" stroke="${warnagaris}" fill="${isi}" stroke-width="${tebal/(rasio*16)}" stroke-opacity="${tampakgaris}" fill-opacity="${tampakisi}"/>`;

}
function tipusling3titik(titik1=[],titik2=[],titik3=[]){
    let x1 = titik1[0];
    let y1 = titik1[1];
    let x2 = titik2[0];
    let y2 = titik2[1];
    let x3 = titik3[0];
    let y3 = titik3[1];
    let a = x2 - x1;
  let b = y2 - y1;
  let c = x3 - x2;
  let d = y3 - y2;

  let e = (a * (x1 + x2)) + (b * (y1 + y2));
  let f = (c * (x2 + x3)) + (d * (y2 + y3));

  let g = 2 * ((a * (y3 - y2)) - (d * (x2 - x3)));

  if (g === 0) {
    return null;
  }

  let centerX = ((d * e) - (b * f)) / g;
  let centerY = ((a * f) - (c * e)) / g;

  return [centerX, centerY];
}
function jariling3titik(titik1=[],titik2=[],titik3=[]){
    let x1 = titik1[0];
    let y1 = titik1[1];
    let x2 = titik2[0];
    let y2 = titik2[1];
    let x3 = titik3[0];
    let y3 = titik3[1];
    let a = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let b = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
    let c = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
    
    let s = (a + b + c) / 2; // setengah dari keliling segitiga
    let area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // luas segitiga menggunakan rumus Heron
    
    let radius = (a * b * c) / (4 * area); // rumus jari-jari lingkaran
    
    return radius;
}
function svgling3titik(kumpulantitik=[],options={}){
    let titikpusat  = tipusling3titik(kumpulantitik[0],kumpulantitik[1],kumpulantitik[2]);
    let jarijari = jariling3titik(kumpulantitik[0],kumpulantitik[1],kumpulantitik[2]);
    let isi = options.isi || "none";
    let warnagaris = options.warnagaris || "black";
    let dash = options.dash || "";
    let tampakisi = options.tampakisi || 1;
    let tampakgaris = options.tampakgaris || 1;
    let tebalgaris = options.tebalgaris || 1;
    return String.raw`<circle cx="${titikpusat[0]}" cy="${titikpusat[1]}" r="${jarijari}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; stroke-dasharray:${dash}; fill: ${isi}; fill-opacity:${tampakisi}; stroke-opacity:${tampakgaris}"/>`;
  }

function svgpersegi(duatitik=[],opsi={}){
    let tiA = duatitik[0];
    let tiB = duatitik[1];
    let tiC = [tiA[1]+tiB[0]-tiB[1],-tiA[0]+tiB[0]+tiB[1]];
    let tiD = [-tiB[1]+tiA[0]+tiA[1],tiB[0]-tiA[0]+tiA[1]];
    let listtitik = `${tiA[0]},${tiA[1]} ${tiB[0]},${tiB[1]} ${tiC[0]},${tiC[1]} ${tiD[0]},${tiD[1]}`
    let warnagaris = opsi.warnagaris || "black";
      let isi = opsi.isi || "none";
      let transparanisi = opsi.tampakisi || 1;
      let tampakgaris = opsi.tampakgaris || 1;
      let tebalgaris = opsi.tebalgaris || 1;
      let rasio = opsi.rasio || 1;
      return String.raw`<polygon points="${listtitik}" style="stroke:${warnagaris}; stroke-width:${tebalgaris}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}"/>`;
}
function svgpers1t(satutitik=[],panjang=0,opsi={}){
    let xA = satutitik[0];
    let yA = satutitik[1];
    let tiB = [xA+panjang,yA];
    let tiC = [xA+panjang,yA+panjang];
    let tiD = [xA,yA+panjang];
    let listtitik = `${xA},${yA} ${tiB[0]},${tiB[1]} ${tiC[0]},${tiC[1]} ${tiD[0]},${tiD[1]}`
    let warnagaris = opsi.warnagaris || "black";
      let isi = opsi.isi || "none";
      let transparanisi = opsi.tampakisi || 1;
      let tampakgaris = opsi.tampakgaris || 1;
      let tebalgaris = opsi.tebalgaris || 1;
      let rasio = opsi.rasio || 1;
      return String.raw`<polygon points="${listtitik}" style="stroke:${warnagaris}; stroke-width:${tebalgaris/(rasio*16)}; fill:${isi}; opacity:${transparanisi}; stroke-opacity:${tampakgaris}"/>`;
}

//kasih garis pendek pada tengah segmen penanda sama panjang
function tandaSamaPanjang(titikA, titikB, p=1,opsi={}) {
    let tbl = opsi.tebalgaris || 1;
    let warna = opsi.warna || "black";
    let dash = opsi.dash || "";
    let tampakgaris = opsi.tampakgaris || 1;
    // Menghitung titik tengah garis AB
    let midPoint = {x: (titikA[0] + titikB[0]) / 2, y: (titikA[1] + titikB[1]) / 2};
    // Menghitung gradien garis AB
    let gradientAB = (titikB[1] - titikA[1]) / (titikB[0] - titikA[0]);
    let titikC = [];
    let titikD = []
    if(gradientAB!=0){
        // Gradien garis yang tegak lurus dengan garis AB adalah -1 / gradientAB
    let gradientPerpendicular = -1 / gradientAB;
    // Menghitung perubahan x dan y berdasarkan panjang p dan gradien
    let dx = p / Math.sqrt(1 + Math.pow(gradientPerpendicular, 2));
    let dy = gradientPerpendicular * dx;
    // Menghitung koordinat titik C dan D
    titikC = [midPoint.x + dx, midPoint.y + dy];
    titikD = [midPoint.x - dx, midPoint.y - dy];
    
    }
    if(gradientAB==0){
    titikC = [midPoint.x,midPoint.y-p/2];
    titikD = [midPoint.x,midPoint.y+p/2];
    }
    return String.raw`<line x1="${titikC[0]}" y1="${titikC[1]}"
    x2="${titikD[0]}" y2="${titikD[1]}"
    stroke="${warna}"
    stroke-width="${tbl}" stroke-dasharray="${dash}" stroke-opacity="${tampakgaris}"/>`
    }

function titikberat(titik1=[], titik2=[], titik3=[]) {
    let x1 = titik1[0];
    let y1 = titik1[1];
    let x2 = titik2[0];
    let y2 = titik2[1];
    let x3 = titik3[0];
    let y3 = titik3[1];
    var centroidX = (x1 + x2 + x3) / 3;
    var centroidY = (y1 + y2 + y3) / 3;
    
    return [centroidX, centroidY];
  }

  //kommbinasi n memilih r
  function komb(n, r) {
    return Math.round(faktorial(n) / (faktorial(r) * faktorial(n - r)));
}

//penjabaran faktorial n
function jabarfakt(n) {
    let hasil = "";
    for (let i = n; i > 0; i--) {
        if (i !== n) {
            hasil += "\\cdot";
        }
        hasil += i;
    }
    return hasil;
}
 
