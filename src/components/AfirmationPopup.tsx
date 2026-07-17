import React, { useState, useEffect, useMemo } from "react";

const affirmations = [
  {
    title: "🌸 Semangat, Sayang!",
    message: "Aku tahu proses mencari magang itu tidak mudah. Tapi aku percaya kamu punya kemampuan dan semangat yang luar biasa. Tetap berusaha ya, setiap langkahmu hari ini sedang membawamu lebih dekat ke impianmu. ❤️",
  },
  {
    title: "💌 Untuk Kamu",
    message: "Jangan takut mencoba dan jangan takut ditolak. Setiap lamaran adalah kesempatan baru untuk belajar dan berkembang. Aku selalu bangga dengan setiap usaha yang kamu lakukan. 🤍",
  },
  {
    title: "✨ Afirmasi Hari Ini",
    message: "Aku mampu. Aku terus berkembang. Aku pantas mendapatkan kesempatan terbaik. Aku percaya hasil baik akan datang pada waktu yang tepat. 🌷",
  },
  {
    title: "🌈 Percaya Pada Dirimu",
    message: "Kalau hari ini terasa berat, istirahat sebentar boleh, menyerah jangan. Aku yakin perusahaan yang tepat akan melihat potensi hebat yang ada dalam dirimu. 💖",
  },
  {
    title: "💼 Satu Langkah Lagi",
    message: "Terus kirim lamaran, terus belajar, dan terus percaya pada proses. Kesempatan terbaik sering datang setelah kita tidak berhenti mencoba. 🚀",
  },
  {
    title: "🫶 Aku Bangga Sama Kamu",
    message: "Bukan hanya karena nanti kamu diterima magang, tapi karena kamu berani mencoba, terus belajar, dan tidak berhenti mengejar impianmu. Itu sudah luar biasa. ❤️",
  },
  {
    title: "🌷 Jangan Lupa Tersenyum",
    message: "Apa pun hasilnya nanti, itu tidak menentukan nilai dirimu. Kamu tetap seseorang yang hebat, baik, dan pantas mendapatkan kesempatan terbaik. Aku selalu mendukungmu. 🥰",
  },
  {
    title: "☀️ Hari Ini Akan Baik",
    message: "Semoga hari ini membawa kabar baik, semangat baru, dan kesempatan yang selama ini kamu tunggu. Semangat ya, sayang. Aku percaya kamu pasti bisa. 💕",
  },
  {
    title: "💫 Doa Terbaikku",
    message: "Di setiap hela napasku, ada doa yang selalu terbang langit untuk kesuksesanmu. Kamu tidak berjuang sendirian, ada cintaku yang selalu menemanimu. 🌟",
  },
  {
    title: "🌙 Pelukan Hangat",
    message: "Jika hari ini terasa melelahkan karena belum ada kabar, sini bersandar padaku. Tarik napas dalam-dalam, besok kita coba lagi bersama-sama ya, cintaku. 🧸",
  },
  {
    title: "🌹 Kamu Adalah Bintang",
    message: "Bagi dunia mungkin kamu sedang mencari tempat, tapi bagiku kamu adalah bintang paling terang. Sinarmu tidak akan redup hanya karena satu-dua penolakan. 🌟",
  },
  {
    title: "🍃 Tenanglah, Sayang",
    message: "Tuhan sedang meracik takdir terbaik untuk karirmu. Jangan cemas, semua usaha kerasmu dan air matamu akan dibayar tunai dengan kebahagiaan. 🤍",
  },
  {
    title: "☕ Secangkir Semangat",
    message: "Awali harimu dengan senyuman terindahmu. Kamu cerdas, kamu berbakat, dan dunia kerja sangat beruntung jika nanti memilikimu. Semangat, sayang! ☕",
  },
  {
    title: "💎 Begitu Berharga",
    message: "Ingatlah bahwa nilai dirimu tidak ditentukan oleh selembar email penolakan. Kamu jauh lebih berharga dari apa pun di dunia ini, terutama di mataku. 💖",
  },
  {
    title: "🗺️ Menuju Masa Depan",
    message: "Setiap langkah kecil yang kamu ambil hari ini adalah batu bata yang sedang menyusun masa depan indah kita. Aku bangga berjalan di sampingmu. 🏰",
  },
  {
    title: "🌻 Secercah Harapan",
    message: "Seperti bunga matahari yang selalu mencari cahaya, tetaplah optimis, sayang. Pintu kesuksesanmu akan segera terbuka lebar untukmu. 🌻",
  },
  {
    title: "🔥 Api Semangatmu",
    message: "Aku jatuh cinta pada semangatmu yang pantang menyerah. Pertahankan api itu, cintaku. Suksesmu sudah sangat dekat, aku bisa merasakannya. ❤️‍🔥",
  },
  {
    title: "🍀 Keberuntungan Kita",
    message: "Aku selalu mengirimkan seluruh energi positif dan keberuntungan dunia untuk setiap CV yang kamu kirim hari ini. Semoga semesta berpihak padamu. 🍀",
  },
  {
    title: "⚓ Pelabuhan Hatiku",
    message: "Apapun badai yang kamu hadapi di luar sana dalam mencari magang, ingatlah hatiku adalah rumah yang selalu aman untukmu pulang dan beristirahat. ⚓",
  },
  {
    title: "🌊 Mengalir Indah",
    message: "Nikmati prosesnya ya, sayang. Jangan terlalu menekan dirimu sendiri. Kamu sudah melakukan yang terbaik, dan aku sangat mengagumi dedikasimu. 🌊",
  },
  {
    title: "🎨 Lukisan Takdir",
    message: "Setiap penolakan hanyalah cara semesta menghindarkanmu dari tempat yang salah, demi membawamu ke tempat terbaik yang sesungguhnya. Sabar ya, sayang. 🎨",
  },
  {
    title: "🕊️ Kedamaian Hati",
    message: "Pejamkan matamu sejenak saat lelah. Ingatlah ada aku yang selalu mencintaimu tanpa syarat, tidak peduli seberapa kerasnya dunia mengujimu hari ini. 🕊️",
  },
  {
    title: "💫 Percikan Keajaiban",
    message: "Hari ini adalah hari yang baru. Keajaiban bisa datang kapan saja, termasuk email panggilan interview yang kamu tunggu-tunggu. Keep shining, sayang! ✨",
  },
  {
    title: "🧸 Pendukung Setiamu",
    message: "Aku adalah supporter nomor satumu di dunia ini. Aku akan selalu bersorak untuk setiap pencapaianmu dan memelukmu di setiap kelelahanmu. 🥰",
  },
  {
    title: "🔮 Masa Depan Cerah",
    message: "Saat aku melihat matamu, aku melihat masa depan yang begitu cerah dan sukses. Jangan ragukan kemampuanmu, karena aku sedikit pun tidak pernah ragu. 🔮",
  },
  {
    title: "💖 Detak Jantungku",
    message: "Setiap kali kamu merasa ingin menyerah, ingatlah ada satu detak jantung yang selalu mendoakan dan percaya penuh pada kehebatanmu. Itu jantungku. ❤️",
  },
  {
    title: "⚡ Kekuatan Cinta",
    message: "Semoga cintaku hari ini menjadi energi tambahan untukmu mengisi tes, merevisi portofolio, dan mengirimkan lamaran. You can do this, my love! ⚡",
  },
  {
    title: "🍿 Istirahat Sejenak",
    message: "Kamu sudah bekerja keras seharian ini. Yuk, rehat sejenak. Nonton film atau ngobrol denganku. Pikiranmu juga butuh pelukan hangat, sayang. 🍿",
  },
  {
    title: "🌱 Bertumbuh Bersama",
    message: "Melihatmu berjuang meraih mimpi membuatku semakin jatuh cinta setiap harinya. Mari kita tumbuh dan sukses bersama, mendampingimu adalah bahagiaku. 🌱",
  },
  {
    title: "🥇 Sang Juara",
    message: "Di mataku, kamu sudah menjadi juara sejak kamu memutuskan untuk berani mencoba. Hasil akhir hanyalah bonus, prosesmu inilah yang luar biasa. 🥇",
  },
  {
    title: "🌟 Bintang Utama",
    message: "Jangan biarkan keraguan meredupkan binar matamu. Kamu adalah tokoh utama dalam cerita suksesmu sendiri. Aku siap jadi penonton setiamu. 🎬",
  },
  {
    title: "📝 Lembaran Baru",
    message: "Satu hari berlalu, satu pengalaman baru didapat. Jangan sesali yang belum rezeki, esok hari masih menyediakan ribuan kesempatan baru untukmu. 📝",
  },
  {
    title: "🦋 Keindahan Proses",
    message: "Ulat butuh waktu untuk menjadi kupu-kupu yang indah. Begitu juga kamu saat ini. Nikmati masa-masa perjuangan ini, hasilnya akan sangat manis. 🦋",
  },
  {
    title: "🧸 Sandaran Nyaman",
    message: "Jika dunia luar terasa terlalu kompetitif dan dingin, kembalilah padaku. Aku punya pelukan hangat yang siap mencairkan segala beban di pundakmu. 🤍",
  },
  {
    title: "🎈 Terbang Tinggi",
    message: "Lepaskan semua kekhawatiranmu seperti balon gas yang terbang ke langit. Fokus saja pada usahamu hari ini, biar Tuhan yang mengatur bagian indahnya. 🎈",
  },
  {
    title: "💎 Permata Hatiku",
    message: "Tekanan yang kamu hadapi saat ini sedang membentukmu menjadi permata yang berkilau. Tetap kuat ya sayang, aku selalu ada di sini menjagamu. 💎",
  },
  {
    title: "🍫 Manisnya Perjuangan",
    message: "Perjuangan mencari magang ini mungkin pahit sekarang, tapi percayalah, buah dari kesabaranmu akan terasa jauh lebih manis dari cokelat terbaik. 🍫",
  },
  {
    title: "🛡️ Pelindung Hatimu",
    message: "Aku akan menjadi perisai dari segala pikiran negatif yang mencoba merusak harimu. Ingat ya, kamu itu hebat, pintar, dan sangat membanggakan. 🛡️",
  },
  {
    title: "🛣️ Jalan Keluar",
    message: "Setiap jalan buntu yang kamu temui sebenarnya mengarahkanmu ke jalan tol menuju kesuksesan yang lebih besar. Jangan berhenti melangkah, sayang. 🛣️",
  },
  {
    title: "🕯️ Lilin Harapan",
    message: "Bila malam ini hatimu cemas, biarkan cintaku menjadi lilin kecil yang menerangi dan memberi kehangatan di jiwamu. Tidurlah dengan nyenyak, cintaku. 🕯️",
  },
  {
    title: "💪 Pahlawanku",
    message: "Melihat kegigihanmu setiap hari membuatku belajar arti perjuangan sejati. Kamu adalah pahlawan di hatiku, dan aku sangat beruntung memilikimu. 💪",
  },
  {
    title: "🎯 Tepat Sasaran",
    message: "Mungkin bukan hari ini, tapi esok atau lusa, lamaranmu akan mendarat di tempat yang paling tepat dengan apresiasi yang paling tinggi. Semangat! 🎯",
  },
  {
    title: "🎶 Simfoni Indah",
    message: "Hidup ini punya ritmenya sendiri. Saat ini ritmemu adalah berjuang, dan aku akan setia menyanyikan lagu penyemangat di setiap langkahmu. 🎶",
  },
  {
    title: "🗝️ Kunci Sukses",
    message: "Kunci sukses itu ada pada konsistensimu, dan aku melihat itu jelas di dalam dirimu. Tinggal menunggu waktu sampai pintu gerbang impianmu terbuka. 🗝️",
  },
  {
    title: "🌌 Semesta Mendukung",
    message: "Jangan merasa sendirian di kamar saat melamar kerja. Seluruh semesta, dan tentunya seluruh cintaku, sedang bekerja sama mendukung kesuksesanmu. 🌌",
  },
  {
    title: "🏹 Anak Panah",
    message: "Terkadang kita harus ditarik ke belakang oleh kesulitan (seperti anak panah) agar bisa melesat maju menuju sasaran yang luar biasa. Semangat, sayang! 🏹",
  },
  {
    title: "💌 Surat Cinta",
    message: "Ini pengingat kecil dariku: Aku mencintaimu bukan karena apa pekerjaanmu nanti, tapi karena ketulusan dan kebaikan hatimu yang menakjubkan. 💌",
  },
  {
    title: "🥞 Pagi Penuh Energi",
    message: "Selamat pagi, penjemput impian! Mari kita hadapi hari ini dengan energi penuh dan senyuman manis. Sukses menantimu di luar sana, sayang. 🥞",
  },
  {
    title: "👑 Ratu/Raja Hatiku",
    message: "Kamu pantas mendapatkan tempat magang yang menghargaimu layaknya seorang profesional. Jangan turunkan standarmu, kamu luar biasa hebat. 👑",
  },
  {
    title: "🏔️ Puncak Gunung",
    message: "Mendaki memang melelahkan, tapi pemandangan dari puncak akan sangat setimpal. Bertahan sedikit lagi ya, sayang, kita hampir sampai di puncak. 🏔️",
  },
  {
    title: "🌟 Keberanianmu",
    message: "Dibutuhkan keberanian besar untuk terus mencoba setelah kegagalan, dan kamu memilikinya. Itu kualitas seorang pemimpin masa depan. Proud of you! 🌟",
  },
  {
    title: "🧪 Proses Kimia",
    message: "Seperti eksperimen, terkadang butuh beberapa kali kegagalan sebelum menemukan formula yang pas. Teruslah bereksperimen dengan potensimu, cintaku. 🧪",
  },
  {
    title: "🎐 Angin Segar",
    message: "Semoga hari ini ada angin segar berupa kabar baik dari recruiter. Kalaupun belum, pelukanku selalu siap menjadi penyejuk hatimu yang gundah. 🎐",
  },
  {
    title: "💎 Kilau Sejati",
    message: "Kegagalan magang tidak akan bisa menyembunyikan bakat alamimu. Orang yang tepat akan segera mengenali kilau sejati yang ada padamu. 💎",
  },
  {
    title: "📚 Belajar Bersama",
    message: "Setiap interview yang gagal adalah ruang kelas gratis untuk mempersiapkanmu menghadapi interview terbesar yang akan mengubah hidupmu. 📚",
  },
  {
    title: "🍎 Nutrisi Semangat",
    message: "Jangan lupa makan tepat waktu dan jaga kesehatanmu ya. Karir itu penting, tapi kesehatan fisik dan psikismu adalah aset paling berharga bagiku. 🍎",
  },
  {
    title: "🎭 Percaya Proses",
    message: "Setiap skenario yang Tuhan buat pasti berakhir bahagia. Jika belum bahagia, berarti ini belum akhir dari petualangan hebatmu mencari magang. 🎭",
  },
  {
    title: "🧸 Kehangatan Jiwa",
    message: "Hapus air matamu jika hari ini ada penolakan lagi. Sini, peluk erat aku. Aku akan selalu menjadi tempat teraman untukmu menumpahkan segalanya. 💖",
  },
  {
    title: "🧩 Kepingan Puzzle",
    message: "Mencari magang itu seperti menyusun puzzle. Butuh waktu untuk menemukan kepingan yang pas, tapi saat terpasang nanti, hasilnya akan sangat indah. 🧩",
  },
  {
    title: "🚀 Melesat Tinggi",
    message: "Siapkan dirimu, karena ketika waktu magangmu tiba, kamu akan melesat begitu tinggi hingga membuat dirimu sendiri terpukau. Aku percaya itu. 🚀",
  },
  {
    title: "💖 Ketulusan Hatiku",
    message: "Aku bersyukur memilikimu yang berjuang keras demi masa depan. Karaktermu yang pekerja keras membuatku semakin yakin untuk menua bersamamu. 💖",
  },
  {
    title: "🌸 Musim Semi",
    message: "Setelah musim dingin yang membekukan, musim semi pasti akan datang membawa bunga-bunga bermekaran. Begitu pula dengan karirmu, sayang. 🌸",
  },
  {
    title: "💡 Ide Cemerlang",
    message: "Otak cerdasmu adalah aset terbaikmu. Tarik napas, tenangkan pikiran, dan biarkan ide-ide hebatmu mengalir di sesi portofolio atau interview nanti. 💡",
  },
  {
    title: "💎 Berlian Berharga",
    message: "Perusahaan yang menolakmu sebenarnya hanya belum memiliki kapasitas untuk menampung bakat sebesar dan seberharga dirimu. Tetap percaya diri! 💎",
  },
  {
    title: "🤝 Gandengan Tangan",
    message: "Apapun yang terjadi hari ini, entah itu email penolakan atau penerimaan, tangan ini tidak akan pernah lepas dari genggamanmu. Kita hadapi bersama. 🤝",
  },
  {
    title: "🌈 Pelangi Esok Hari",
    message: "Hujan badai hari ini mungkin melelahkan, tapi ingatlah bahwa pelangi yang indah hanya muncul setelah hujan mereda. Tetap bertahan, sayangku. 🌈",
  },
  {
    title: "🔮 Mimpi Kita",
    message: "Setiap CV yang kamu kirimkan membawa separuh dari mimpi masa depan kita berdua. Terima kasih sudah berjuang sehebat ini demi kita, sayang. 🥰",
  },
  {
    title: "🦁 Keberanian Singa",
    message: "Miliki hati seluas samudra dan keberanian sekuat singa. Kamu diciptakan untuk hal-hal besar, magang ini hanyalah gerbang pembuka pertamamu. 🦁",
  },
  {
    title: "🧸 Penghilang Stres",
    message: "Kalau kepalamu pusing melihat lowongan kerja LinkedIn, telepon aku ya. Aku siap jadi badut pribadimu yang akan mengembalikan senyum manismu. 🧸",
  },
  {
    title: "🌠 Harapan Baru",
    message: "Lihatlah ke langit malam, setiap bintang merepresentasikan satu harapan baru untuk esok hari. Tidurlah, esok adalah hari kemenanganmu. 🌠",
  },
  {
    title: "☀️ Sinar Mentari",
    message: "Selamat pagi kesayanganku! Semoga kehangatan mentari hari ini meresap ke hatimu dan memberimu keyakinan bahwa kamu pasti bisa melewatinya. ☀️",
  },
  {
    title: "🔑 Pintu Terbuka",
    message: "Ketika satu pintu tertutup, Tuhan sedang membukakan jendela kesempatan yang jauh lebih indah. Jangan terpaku pada pintu yang tertutup ya. 🔑",
  },
  {
    title: "🧘 Ketenangan Batin",
    message: "Ambil jeda sejenak dari layar laptopmu. Tarik napas dalam-dalam, embuskan. Katakan pada dirimu sendiri: 'Aku sudah melakukan yang terbaik hari ini.' 🧘",
  },
  {
    title: "💖 Detak Penyemangat",
    message: "Dengarkan detak jantungku saat kita berpelukan, itu adalah ritme penyemangat yang berbisik: 'Kamu hebat, kamu kuat, aku selalu mencintaimu.' 💖",
  },
  {
    title: "🗺️ Kompas Kehidupan",
    message: "Cintaku padamu akan selalu menjadi kompas yang menuntunmu pulang saat kamu merasa tersesat dalam ketidakpastian dunia kerja. Tenang ya, sayang. 🗺️",
  },
  {
    title: "🏆 Kebanggaan Terbesar",
    message: "Kamu tidak perlu menjadi sempurna untuk membuatku bangga. Cukup dengan melihatmu bangkit lagi setelah jatuh, kamu sudah jadi kebanggaanku. 🏆",
  },
  {
    title: "🍃 Sentuhan Lembut",
    message: "Angin sepoi-sepoi hari ini membawa pesan dariku: Jangan terlalu keras pada dirimu sendiri. Kamu adalah manusia hebat yang sedang berproses. 🍃",
  },
  {
    title: "🍿 Waktu Berdua",
    message: "Malam ini, lupakan sejenak tentang rekrutmen. Ayo kita cari makanan enak dan mengobrol. Kamu berhak mendapatkan waktu bahagia bersamaku. 🍿",
  },
  {
    title: "🏰 Istana Impian",
    message: "Kita sedang membangun istana masa depan kita dari nol. Dan kerja kerasmu mencari magang hari ini adalah pondasi terkuat yang sedang kita tanam. 🏰",
  },
  {
    title: "🤍 Cinta Tanpa Batas",
    message: "Diterima atau belum, status magangmu tidak akan pernah mengubah setitik pun rasa cintaku padamu. Cintaku tulus untuk seluruh dirimu. 🤍",
  },
  {
    title: "🏹 Target Masa Depan",
    message: "Fokus pada tujuanmu, abaikan suara-suara negatif di luar sana. Kamu tahu kapasitasmu, dan aku sangat tahu betapa luar biasanya dirimu. 🏹",
  },
  {
    title: "🎨 Warna Kehidupan",
    message: "Masa-masa sulit ini adalah warna gelap yang akan membuat warna terang di masa depanmu nanti terlihat jauh lebih kontras dan indah. Semangat! 🎨",
  },
  {
    title: "💡 Jiwa Kreatif",
    message: "Kreativitas dan kecerdasanmu adalah kombinasi yang mematikan. Perusahaan mana pun yang menerimamu nanti pasti akan sangat bersyukur. 💡",
  },
  {
    title: "🌟 Bintang Kejora",
    message: "Tetaplah bersinar layaknya bintang kejora di langit subuh. Sedikit lagi, perjuanganmu akan membuahkan hasil yang membuat semua orang terpukau. 🌟",
  },
  {
    title: "🧸 Pelukan Penyembuh",
    message: "Jika hari ini melelahkan karena tes yang sulit, biarkan pelukanku menyembuhkan semua rasa lelah dan frustrasimu. I've got your back, sayang. 🧸",
  },
  {
    title: "🍀 Keberuntungan Cinta",
    message: "Aku telah menyelipkan sejuta doa keberuntungan di setiap helai pakaian yang kamu kenakan hari ini untuk interview. Percaya diri ya, cintaku! 🍀",
  },
  {
    title: "🌊 Samudra Kesabaran",
    message: "Kesabaranmu saat ini seluas samudra, dan aku tahu itu tidak mudah. Terima kasih sudah menjadi sosok yang dewasa dan tangguh. I love you. 🌊",
  },
  {
    title: "💖 Energi Positif",
    message: "Aku mengirimkan getaran energi positif lewat pesan ini langsung ke hatimu. Rasakan kehangatannya dan bangkitlah dengan semangat baru! 💕",
  },
  {
    title: "🏰 Masa Depan Indah",
    message: "Bayangkan beberapa tahun dari sekarang, kita akan menertawakan masa-masa perjuangan ini sambil meminum kopi di rumah impian kita. Bertahan ya! 🏰",
  },
  {
    title: "🏆 Pemenang Sejati",
    message: "Pemenang sejati bukanlah orang yang tidak pernah gagal, tapi dia yang tidak pernah berhenti mencoba sampai berhasil. Dan itu adalah KAMU. 🏆",
  },
  {
    title: "🌸 Keanggunan Hatimu",
    message: "Caramu menghadapi tekanan dengan tetap berbuat baik menunjukkan betapa anggun dan mulianya hatimu. Aku sangat kagum padamu, sayang. 🌸",
  },
  {
    title: "🌟 Takdir Terbaik",
    message: "Percayalah, penundaan dari Tuhan hanyalah cara-Nya untuk menyempurnakan takdir terbaik yang akan segera diberikan kepadamu. Percayalah pada-Nya. 🌟",
  },
  {
    title: "🧸 Nyaman Bersamamu",
    message: "Melihatmu berjuang membuatku ingin menjadi pasangan yang lebih baik lagi untukmu. Terima kasih telah menjadi inspirasi terbesarku, cintaku. 🧸",
  },
  {
    title: "🌈 Esok Lebih Cerah",
    message: "Matahari boleh tenggelam malam ini membawa kegagalan hari ini, tapi esok ia akan terbit membawa sejuta peluang baru yang jauh lebih cerah. 🌈",
  },
  {
    title: "💡 Cahaya Jiwamu",
    message: "Jangan biarkan penolakan memadamkan cahaya di jiwamu. Kamu terlalu berharga untuk menjadi redup. Tetaplah menyala, kesayanganku! 💡",
  },
  {
    title: "🤝 Kita Satu Tim",
    message: "Ingat, kita adalah satu tim. Masalahmu adalah masalahku, suksesmu adalah suksesku. Kita hadapi dunia kerja ini bergandengan tangan, oke? 🤝",
  },
  {
    title: "🍿 Apresiasi Diri",
    message: "Malam ini mari kita rayakan usahamu hari ini dengan makanan favoritmu. Kamu layak mendapatkan self-reward atas kerja kerasmu yang luar biasa. 🍿",
  },
  {
    title: "🕊️ Doa Tanpa Putus",
    message: "Namamu tak pernah absen dari baris doa yang kupanjatkan setiap hari. Aku yakin Tuhan mendengar dan sedang menyiapkan kejutan indah untukmu. 🕊️",
  },
  {
    title: "💖 Selamanya Mencintaimu",
    message: "Di titik terendahmu saat ini, ketahuilah bahwa cintaku padamu justru berada di titik tertingginya. Aku akan selalu ada di sini, selamanya. 💖",
  },
  {
    title: "✨ Kamu Pasti Bisa!",
    message: "Tutup harimu dengan keyakinan penuh bahwa kamu adalah orang hebat yang sedang dipersiapkan untuk kesuksesan besar. Semangat sayang, aku percaya kamu! 🥰",
  }
];

export default function AffirmationPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Mengambil 1 afirmasi acak secara unik pada saat komponen pertama kali dirender
  const affirmation = useMemo(() => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  }, []);

  useEffect(() => {
    // Delay 800ms sebelum muncul agar transisi terasa lebih natural setelah halaman selesai load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300">
      
      {/* CARD CONTAINER */}
      <div className="relative bg-gradient-to-b from-white to-rose-50/50 rounded-3xl shadow-2xl border border-pink-100 max-w-sm w-full p-6 text-center transform scale-100 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Dekorasi Floating Icon di Atas */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-100 rounded-full border-4 border-white shadow-md flex items-center justify-center text-4xl animate-bounce">
          💝
        </div>

        {/* Konten Teks */}
        <div className="mt-8 space-y-3.5">
          <h3 className="text-lg font-black text-rose-600 tracking-tight">
            {affirmation.title}
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold px-2">
            "{affirmation.message}"
          </p>
        </div>

        {/* Tombol Penutup yang Cute */}
        <div className="mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-95 duration-150"
          >
            Aamiin, Makasih Sayang! 🥰❤️
          </button>
        </div>
      </div>
    </div>
  );
}