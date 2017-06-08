Repository dah Beres tinggal Maen Push & Pull
Nih Petunjuk pake Git :

1)  Download Git, Install (Next,Next,Next :v)

2)  Bikin 1 Folder kosong (New Folder)

3)  Masuk ke Folder Kosong Tsb Klik Kanan Pilih "Git Bash Here"

4)  Tulis       : git config --global user.name "Isi dgn Nickname Github mu" 

    Cth         : git config --global user.name "Degianz"
    
    Tulis       : git config --global user.email "Isi dgn email pas daftar Github mu"
   
    Cth         : git config --global user.email "giangenesisiusb@gmail.com"
    
5)  Tulis       : git clone https://github.com/Py15112327/CalculatorRepo.git

6)  Close Gitnya, Masuk ke folder CalculatorRepo klik kanan Pilih "Git Bash Here"

7)  Add Remote Repository dengan :

    Tulis       : git Remote add origin https://github.com/Py151112327/CalculatorRepo.git

Step 1 - 7 cuma 1 kali aja untuk 1 buah project :v

nah ini yg bakal berulang2 :

1)  Pastikan data Di foldermu merupakan data yg terupdate dari remote Repository sebelum mengedit Code
    (kalo bsa lakukan 12 jam sekali !)
    
    Tulis       : git pull -u origin master
    
2)  Lakukan Editing pada file (ngoding lah :v)

3)  Kalau udah Selesai ngoding, kirim filemu ke Remote repository dgn cara :

    Ketik       : git add *
    
    Ketik       : git Commit -m "Pesan singkat tentang Apa aja yg lu ubah pas ngoding tdi"
    
    cth         : git commit -m "oi gw ngubah tampilan backgroundnya ya!"
    
    ketik       : git push -u origin master

Nah lakukan step 2 - 3 berulang (1 - 3 klo mw data akurat) setiap kalian mau tambah isi code
okay Done :v

