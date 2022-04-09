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

function minorsebagian(matriks,baris,kolom){
    let hasil = JSON.parse(JSON.stringify(matriks));
    hasil.splice(baris-1,1);
    for(let i=0;i<hasil.length;i++){
        hasil[i].splice(kolom-1,1);
    }
    return hasil;
}

function det(matriks){
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

function minor(matriks,baris,kolom){
    return det(minorsebagian(matriks,baris,kolom));
}

function matriksminor(matriks){
    let hasil = [];
    for(let i=0;i<matriks.length;i++){
        hasil[i]=[];
        for(let k=0;k<matriks.length;k++){
            hasil[i][k]=minor(matriks,i+1,k+1)
        }
    }
    return hasil;
}

function matrikskofaktor(matriks){
    let hasil = matriksminor(matriks);
    for(let i=0;i<hasil.length;i++){
        for(let j=0;j<hasil.length;j++){
            hasil[i][j]=Math.pow(-1,i+j)*hasil[i][j]
        }
    }
    return hasil;
}

function transpose(matriks){
    let hasil = [];
    for(let i=0;i<matriks[0].length;i++){
        hasil[i]=[];
        for(let j=0;j<matriks.length;j++){
            hasil[i][j]=matriks[j][i]
        }
    }
    return hasil;
}

function adjoin(matriks){
    return transpose(matrikskofaktor(matriks));
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
function matriksinvers(matriks){
    let hasil = adjoin(matriks);
    for(let i=0;i<hasil.length;i++){
        for(let j=0;j<hasil.length;j++){
            hasil[i][j] = hasil[i][j]/det(matriks)
        }
    }
    return hasil
}
 function jumlah2(a,b){
    return a+b;
  }
  function jumlah(n){
    return n.reduce(jumlah2)
  }

  function jumlahkuadrat2(a,b){
      return a*a+b*b
  }

  function jumlahkuadrat(x){
      return x.reduce(jumlahkuadrat2)
  }

  function panjangvektor(vektor){
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

function pecahan(pembilang,penyebut){
    let faktor = fpb2(pembilang,penyebut)
    if(faktor==penyebut){
      return pembilang/penyebut
    }else{return String.raw`\dfrac{${pembilang/faktor}}{${penyebut/faktor}}`}
  }
  function koef(n){
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
function kurmin(angka){
  if(angka>=0){
    return angka
  }else{return `(${angka})`}
}
const arraybilbul = (batasbawah=0,batasatas=batasbawah+1) => {
    let hasil = [];
    for (let i = batasbawah; i < batasatas+1; i++) {
        hasil.push(i)
    }
    return hasil
}
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
 function acakarray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }