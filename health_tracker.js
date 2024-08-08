document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    const dailyCalories = (10 * weight + 6.25 * height - 5 * age + 5) * 1.2;
    const calorieSurplus = dailyCalories + 500;
    const idealWeightRange = calculateIdealWeight(height);

    const exerciseRecommendations = getExerciseRecommendations(age, weight, height);
    const bodyFatInfo = getBodyFatInformation(weight, height, age);
    const dietSuggestions = getDietSuggestions(weight, idealWeightRange);

    const resultContent = `
        <div class="result-container">
            <div class="indicator-container">
                <h3>BMI</h3>
                <div class="indicator">
                    <div class="indicator-fill" style="width: ${calculateBMIIndicator(bmi)}%; background-color: ${getBMIColor(bmi)};"></div>
                </div>
                <p>BMI: <strong>${bmi}</strong></p>
            </div>
            <div class="indicator-container">
                <h3>Kebutuhan Kalori Harian</h3>
                <div class="indicator">
                    <div class="indicator-fill" style="width: ${calculateCaloriesIndicator(dailyCalories)}%; background-color: ${getCaloriesColor(dailyCalories)};"></div>
                </div>
                <p>Kebutuhan Kalori Harian: <strong>${dailyCalories.toFixed(2)} kkal</strong></p>
                ${weight < 60 ? `<p>Asupan Kalori yang Disarankan untuk Penambahan Berat Badan: <strong>${calorieSurplus.toFixed(2)} kkal</strong></p>` : ''}
            </div>
            <h3>Informasi Lemak Tubuh</h3>
            ${bodyFatInfo}
            <h3>Berat Badan Ideal</h3>
            <p>Berat badan ideal untuk tinggi badan ${height} cm adalah antara <strong>${idealWeightRange.min.toFixed(2)} kg</strong> dan <strong>${idealWeightRange.max.toFixed(2)} kg</strong>.</p>
            <h3>Penjelasan Kesehatan</h3>
            <p>BMI adalah ukuran yang digunakan untuk menilai apakah berat badan Anda sehat untuk tinggi badan Anda. 
            BMI yang tinggi bisa meningkatkan risiko berbagai masalah kesehatan, seperti penyakit jantung, diabetes, dan tekanan darah tinggi.</p>
            <p>Kebutuhan kalori harian Anda adalah <strong>${dailyCalories.toFixed(2)} kkal</strong>, yang merupakan jumlah kalori yang diperlukan untuk mempertahankan berat badan saat ini. 
            Mengurangi asupan kalori dapat membantu penurunan berat badan, tetapi penting untuk menjaga pola makan yang seimbang.</p>
            ${weight < 60 ? `<p>Anda disarankan untuk meningkatkan asupan kalori untuk menambah berat badan dengan sehat. Fokus pada makanan tinggi kalori dan nutrisi.</p>` : ''}
            <h3>Rekomendasi Diet</h3>
            ${dietSuggestions}
            <h3>Rekomendasi Olahraga</h3>
            ${exerciseRecommendations}
            <h3>Jadwal Latihan Otomatis</h3>
            <p>Apakah Anda ingin saya membuatkan jadwal latihan Anda secara otomatis?</p>
            <button id="yesButton">Iya</button>
            <button id="noButton">Tidak</button>
            <div id="automaticSchedule" class="hidden"></div>
            <h3>Simulasi Setelah 4 Minggu</h3>
            <div id="simulationResult" class="hidden"></div>
        </div>
    `;

    document.getElementById('result').innerHTML = resultContent;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('healthForm').classList.add('hidden');

    // Tampilkan tombol input ulang dan unduh PDF
    document.getElementById('buttonContainer').classList.remove('hidden');

    document.getElementById('downloadButton').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        // Header
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Laporan Hasil Pelacak Kesehatan", 105, 15, { align: 'center' });
    
        // Garis pembatas bawah header
        doc.setLineWidth(0.5);
        doc.line(10, 20, 200, 20);
    
        // Informasi utama
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        let yPosition = 30;
        const lineSpacing = 8; // Pengaturan jarak antar baris
    
        // Bagian BMI
        doc.setFont("helvetica", "bold");
        doc.text("BMI", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        doc.text(`BMI: ${bmi}`, 15, yPosition);
    
        yPosition += lineSpacing + 5; // Jarak tambahan antara bagian utama
    
        // Bagian Kebutuhan Kalori Harian
        doc.setFont("helvetica", "bold");
        doc.text("Kebutuhan Kalori Harian", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        doc.text(`Kebutuhan Kalori Harian: ${dailyCalories.toFixed(2)} kkal`, 15, yPosition);
        
        if (weight < 60) {
            yPosition += lineSpacing;
            doc.text(`Asupan Kalori yang Disarankan untuk Penambahan Berat Badan: ${calorieSurplus.toFixed(2)} kkal`, 15, yPosition);
        }
    
        yPosition += lineSpacing + 5;
    
        // Bagian Informasi Lemak Tubuh
        doc.setFont("helvetica", "bold");
        doc.text("Informasi Lemak Tubuh", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        const bodyFatInfo = "Persentase Lemak Tubuh: 21.74%\nKategori Lemak Tubuh: Acceptable\nDampak Kesehatan: Tingkat lemak tubuh ini masih dianggap sehat.";
        doc.text(bodyFatInfo, 15, yPosition); // Menggunakan bodyFatInfo dari HTML
        yPosition += lineSpacing * (bodyFatInfo.split('\n').length); // Menghitung jumlah baris
    
        // Bagian Berat Badan Ideal
        doc.setFont("helvetica", "bold");
        doc.text("Berat Badan Ideal", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        doc.text(`Berat badan ideal untuk tinggi badan ${height} cm adalah antara ${idealWeightRange.min.toFixed(2)} kg dan ${idealWeightRange.max.toFixed(2)} kg.`, 15, yPosition);
    
        yPosition += lineSpacing + 5;
    
        // Bagian Penjelasan Kesehatan
        doc.setFont("helvetica", "bold");
        doc.text("Penjelasan Kesehatan", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
            
        // Menggunakan maxWidth untuk membatasi lebar teks dan mencegah tumpang tindih
        const healthExplanation1 = "BMI adalah ukuran yang digunakan untuk menilai apakah berat badan Anda sehat untuk tinggi badan Anda. BMI yang tinggi bisa meningkatkan risiko berbagai masalah kesehatan, seperti penyakit jantung, diabetes, dan tekanan darah tinggi.";
        const healthExplanation2 = `Kebutuhan kalori harian Anda adalah ${dailyCalories.toFixed(2)} kkal, yang merupakan jumlah kalori yang diperlukan untuk mempertahankan berat badan saat ini. Mengurangi asupan kalori dapat membantu penurunan berat badan, tetapi penting untuk menjaga pola makan yang seimbang.`;
            
        doc.text(healthExplanation1, 15, yPosition, { maxWidth: 180 });
        yPosition += lineSpacing + 5; // Jarak tambahan setelah penjelasan pertama
        doc.text(healthExplanation2, 15, yPosition, { maxWidth: 180 });
            
        if (weight < 60) {
            yPosition += lineSpacing;
            doc.text("Anda disarankan untuk meningkatkan asupan kalori untuk menambah berat badan dengan sehat. Fokus pada makanan tinggi kalori dan nutrisi.", 15, yPosition, { maxWidth: 180 });
        }
        
    
        yPosition += lineSpacing + 5;
    
        // Bagian Rekomendasi Diet
        doc.setFont("helvetica", "bold");
        doc.text("Rekomendasi Diet", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        const dietSuggestions = "Untuk mencapai berat badan ideal, disarankan untuk:\n1. Mengurangi asupan kalori dengan memilih makanan rendah kalori dan tinggi nutrisi.\n2. Mengurangi makanan yang tinggi lemak jenuh dan gula.\n3. Minum air putih minimal 3 liter sehari.\n4. Hindari makanan dengan label 'diet' atau 'rendah lemak'.";
        doc.text(dietSuggestions, 15, yPosition, { maxWidth: 180 }); // Menggunakan dietSuggestions dari HTML
    
        yPosition += lineSpacing * (dietSuggestions.split('\n').length) + 5;
    
        // Bagian Rekomendasi Olahraga
        doc.setFont("helvetica", "bold");
        doc.text("Rekomendasi Olahraga", 10, yPosition);
        yPosition += lineSpacing;
        doc.setFont("helvetica", "normal");
        const exerciseRecommendations = "1. Lari: Meningkatkan daya tahan dan kesehatan jantung.\n2. Berenang: Latihan kardiovaskular yang efektif.\n3. Latihan Interval: Meningkatkan metabolisme dan membakar kalori.\n4. CrossFit: Kombinasi latihan kekuatan dan kardiovaskular.";
        doc.text(exerciseRecommendations, 15, yPosition, { maxWidth: 180 }); // Menggunakan exerciseRecommendations dari HTML
    
        // Garis pembatas atas footer
        doc.setLineWidth(0.5);
        doc.line(10, 280, 200, 280);
    
        // Footer
        doc.setFontSize(10);
        doc.text("© 2024 Vdganh Health Solutions", 105, 290, { align: 'center' });
    
        // Simpan PDF
        doc.save('Hasil_Pelacak_Kesehatan.pdf');
    });
    

    // Fungsi untuk input ulang
    document.getElementById('restartButton').addEventListener('click', function() {
        document.getElementById('healthForm').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
        document.getElementById('buttonContainer').classList.add('hidden');
        document.getElementById('healthForm').reset();
    });

    // Fungsi untuk mendapatkan saran diet berdasarkan berat badan
    function getDietSuggestions(weight, idealWeightRange) {
        let suggestions = '';
        const waterIntake = Math.ceil(weight * 0.03); // Rekomendasi minum 30 ml per kg berat badan

        // Menentukan kategori berat badan dan memberikan saran yang sangat detail
        if (weight < idealWeightRange.min) {
            suggestions += `
                <p>Untuk mencapai berat badan ideal, disarankan untuk:</p>
                <ul>
                    <li>Menambah konsumsi kalori dengan makanan tinggi energi, seperti:
                        <ul>
                            <li><strong>Kacang-kacangan:</strong> Almond, kenari, dan kacang tanah. Makanan ini tinggi lemak sehat dan kalori, serta mengandung serat yang baik untuk pencernaan.</li>
                            <li><strong>Alpukat:</strong> Sumber lemak sehat, kaya vitamin E, potasium, dan asam folat. Dapat ditambahkan ke smoothie atau salad.</li>
                            <li><strong>Minyak zaitun:</strong> Gunakan untuk memasak atau sebagai dressing salad. Mengandung antioksidan yang baik untuk kesehatan jantung.</li>
                            <li><strong>Sereal tinggi serat:</strong> Oatmeal atau granola yang menyediakan energi, serat, dan membantu menjaga rasa kenyang lebih lama.</li>
                        </ul>
                    </li>
                    <li>Menambahkan makanan kaya protein, seperti:
                        <ul>
                            <li><strong>Daging tanpa lemak:</strong> Ayam, daging sapi, dan kalkun sebagai sumber protein yang membangun otot.</li>
                            <li><strong>Ikan:</strong> Salmon, tuna, dan makarel yang kaya omega-3, baik untuk kesehatan jantung dan otak.</li>
                            <li><strong>Telur:</strong> Sumber protein lengkap yang mengandung semua asam amino esensial.</li>
                            <li><strong>Produk susu:</strong> Keju, yogurt, dan susu sebagai sumber kalsium dan protein, serta probiotik untuk kesehatan pencernaan.</li>
                            <li><strong>Tempe dan tahu:</strong> Sumber protein nabati yang kaya akan serat dan dapat membantu menjaga kesehatan jantung.</li>
                        </ul>
                    </li>
                    <li>Minum lebih banyak air putih, setidaknya <strong>${waterIntake} liter</strong> sehari untuk menjaga hidrasi, metabolisme, dan fungsi tubuh yang optimal.</li>
                    <li><strong>Hindari:</strong>
                        <ul>
                            <li>Makanan rendah kalori yang tidak bergizi, seperti keripik atau makanan ringan manis yang tinggi gula tetapi rendah nutrisi.</li>
                            <li>Minuman berkadar gula tinggi seperti soda atau minuman energi yang mengandung banyak kalori kosong.</li>
                            <li>Makanan yang mengandung bahan pengawet dan bahan kimia berbahaya.</li>
                        </ul>
                    </li>
                </ul>
            `;
        } else if (weight > idealWeightRange.max) {
            suggestions += `
                <p>Untuk mencapai berat badan ideal, disarankan untuk:</p>
                <ul>
                    <li>Mengurangi asupan kalori dengan memilih makanan rendah kalori dan tinggi nutrisi, seperti:
                        <ul>
                            <li><strong>Sayuran hijau:</strong> Brokoli, bayam, dan sayuran hijau lainnya yang kaya serat dan rendah kalori, membantu menurunkan berat badan.</li>
                            <li><strong>Buah-buahan:</strong> Apel, jeruk, dan berry yang rendah kalori, kaya serat, dan mengandung vitamin serta mineral penting.</li>
                            <li><strong>Protein rendah lemak:</strong> Ikan, ayam tanpa kulit, atau sumber protein nabati seperti lentil dan buncis.</li>
                            <li><strong>Biji-bijian utuh:</strong> Nasi merah, quinoa, atau roti gandum utuh yang lebih bergizi dan memberikan energi tahan lama.</li>
                        </ul>
                    </li>
                    <li>Mengurangi makanan yang tinggi lemak jenuh dan gula, seperti:
                        <ul>
                            <li><strong>Fast food:</strong> Makanan cepat saji yang tinggi lemak dan kalori, sebaiknya dihindari sepenuhnya.</li>
                            <li><strong>Minuman manis:</strong> Soda, jus kemasan, dan minuman dengan tambahan gula yang dapat menambah berat badan.</li>
                            <li><strong>Kue dan makanan penutup manis:</strong> Batasi konsumsi makanan manis yang tidak diperlukan.</li>
                            <li><strong>Makanan olahan:</strong> Makanan yang mengandung banyak pengawet dan bahan kimia.</li>
                        </ul>
                    </li>
                    <li>Minum air putih minimal <strong>${waterIntake} liter</strong> sehari untuk membantu proses penurunan berat badan dan menjaga metabolisme yang baik.</li>
                    <li><strong>Hindari:</strong>
                        <ul>
                            <li>Makanan dengan label 'diet' atau 'rendah lemak', karena sering kali mengandung gula tambahan untuk meningkatkan rasa.</li>
                            <li>Meja makan sambil menonton TV atau menggunakan gadget, yang dapat menyebabkan makan berlebihan tanpa disadari.</li>
                        </ul>
                    </li>
                </ul>
            `;
        } else {
            suggestions += `
                <p>Anda sudah berada dalam rentang berat badan ideal! Disarankan untuk:</p>
                <ul>
                    <li>Menjaga pola makan seimbang dengan:
                        <ul>
                            <li><strong>Makanan kaya serat:</strong> Konsumsi banyak sayuran dan buah-buahan untuk menjaga kesehatan pencernaan.</li>
                            <li><strong>Protein sehat:</strong> Ikan, kacang-kacangan, dan sumber protein nabati yang membantu menjaga massa otot.</li>
                            <li><strong>Karbohidrat kompleks:</strong> Pilih biji-bijian utuh seperti nasi merah dan quinoa untuk mendapatkan energi yang stabil.</li>
                        </ul>
                    </li>
                    <li>Terus minum air putih setidaknya <strong>${waterIntake} liter</strong> sehari untuk menjaga hidrasi.</li>
                    <li><strong>Hindari:</strong>
                        <ul>
                            <li>Makanan olahan dan tinggi gula yang dapat mengganggu keseimbangan nutrisi.</li>
                            <li>Minuman berkadar gula tinggi dan makanan cepat saji untuk menjaga kesehatan tubuh.</li>
                        </ul>
                    </li>
                </ul>
            `;
        }

        // Menambahkan penjelasan tentang pentingnya pola makan yang sehat
        suggestions += `
            <p>Memperhatikan pola makan yang sehat sangat penting untuk menjaga kesehatan secara keseluruhan, termasuk meningkatkan energi, menjaga berat badan ideal, dan mencegah penyakit kronis. Pertimbangkan untuk mengonsumsi suplemen multivitamin jika diperlukan, dan konsultasikan dengan ahli gizi atau dokter sebelum melakukan perubahan drastis pada pola makan Anda.</p>
            <p>Pola makan yang baik juga melibatkan mengatur waktu makan. Pertimbangkan untuk makan dengan interval yang lebih kecil dan lebih sering, seperti 5-6 kali sehari, untuk menjaga metabolisme tetap aktif.</p>
        `;

        return suggestions;
    }


    // Menangani pengalaman olahraga
    const experienceInput = document.getElementById('experienceInput');
    if (experienceInput && experienceInput.value) {
        const experience = experienceInput.value.toLowerCase();
        const schedule = generateSchedule(experience, age, weight);
        document.getElementById('automaticSchedule').innerHTML = schedule;
        document.getElementById('automaticSchedule').classList.remove('hidden');
        simulateProgress(weight, experience);
    } else {
        document.getElementById('yesButton').addEventListener('click', function() {
            const modalHtml = `
                <div class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>Pengalaman Olahraga</h2>
                        <p>Apakah Anda pernah berolahraga sebelumnya? (Ya/Tidak)</p>
                        <input type="text" id="experienceInput" placeholder="Ya/Tidak" />
                        <button id="submitExperience">Kirim</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const modal = document.querySelector('.modal');
            const closeButton = modal.querySelector('.close');

            closeButton.onclick = function() {
                modal.remove();
            };

            document.getElementById('submitExperience').addEventListener('click', function() {
                const experience = document.getElementById('experienceInput').value.toLowerCase();
                let schedule = generateSchedule(experience, age, weight);
                
                document.getElementById('automaticSchedule').innerHTML = schedule;
                document.getElementById('automaticSchedule').classList.remove('hidden');
                simulateProgress(weight, experience);
                modal.remove();
            });
        });
    }

    document.getElementById('noButton').addEventListener('click', function() {
        const message = "<h3>Terima kasih!</h3><p>Anda dapat melihat jadwal latihan contoh di atas.</p>";
        document.getElementById('automaticSchedule').innerHTML = message;
        document.getElementById('automaticSchedule').classList.remove('hidden');
    });
});

// Fungsi untuk mendapatkan rekomendasi olahraga
function getExerciseRecommendations(age, weight, height) {
    let recommendations = '<ul>';

    // Rekomendasi berdasarkan usia
    if (age < 18) {
        recommendations += `
            <li><strong>Olahraga yang disarankan untuk remaja:</strong> 
                <ul>
                    <li>Sepak bola: Membantu meningkatkan stamina dan kerjasama tim.</li>
                    <li>Basket: Meningkatkan koordinasi dan kelincahan.</li>
                    <li>Berenang: Meningkatkan kekuatan otot dan kardiovaskular.</li>
                    <li>Senam: Meningkatkan fleksibilitas dan keseimbangan.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan stamina, kekuatan otot, koordinasi, serta keterampilan sosial.</li>
        `;
    } else if (age >= 18 && age < 35) {
        recommendations += `
            <li><strong>Olahraga yang disarankan untuk dewasa muda:</strong> 
                <ul>
                    <li>Lari: Meningkatkan daya tahan dan kesehatan jantung.</li>
                    <li>Berenang: Latihan kardiovaskular yang efektif.</li>
                    <li>Latihan Interval: Meningkatkan metabolisme dan membakar kalori.</li>
                    <li>CrossFit: Kombinasi latihan kekuatan dan kardiovaskular.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan daya tahan jantung dan paru-paru, membakar kalori dengan efektif, serta membentuk tubuh.</li>
        `;
    } else if (age >= 35 && age < 50) {
        recommendations += `
            <li><strong>Olahraga yang disarankan untuk dewasa:</strong> 
                <ul>
                    <li>Berjalan: Olahraga ringan yang bisa dilakukan kapan saja.</li>
                    <li>Bersepeda: Meningkatkan kebugaran tanpa membebani sendi.</li>
                    <li>Yoga: Meningkatkan fleksibilitas, kekuatan, dan kesehatan mental.</li>
                    <li>Pilates: Meningkatkan kekuatan inti dan postur tubuh.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan fleksibilitas, keseimbangan, kesehatan mental, serta membantu mengurangi stres.</li>
        `;
    } else {
        recommendations += `
            <li><strong>Olahraga yang disarankan untuk lansia:</strong> 
                <ul>
                    <li>Tai Chi: Meningkatkan keseimbangan dan mengurangi stres.</li>
                    <li>Berjalan: Membantu menjaga kesehatan jantung dan stamina.</li>
                    <li>Latihan Kekuatan Ringan: Membangun massa otot dan meningkatkan kepadatan tulang.</li>
                    <li>Senam Lanjut Usia: Membantu menjaga fleksibilitas dan keseimbangan.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan keseimbangan, mengurangi risiko jatuh, memperbaiki mobilitas, dan meningkatkan kualitas hidup.</li>
        `;
    }

    // Rekomendasi berdasarkan berat badan
    if (weight > 90) {
        recommendations += `
            <li><strong>Rekomendasi untuk berat badan lebih dari 90 kg:</strong> 
                <ul>
                    <li>Latihan Kardiovaskular: Lari, bersepeda, atau berenang untuk membakar lemak.</li>
                    <li>Latihan HIIT: Meningkatkan metabolisme dan membakar kalori dalam waktu singkat.</li>
                    <li>Latihan Beban: Membangun otot untuk meningkatkan metabolisme basal.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan kesehatan jantung, menurunkan tekanan darah, membakar lemak, dan membangun kekuatan.</li>
        `;
    } else if (weight < 60) {
        recommendations += `
            <li><strong>Rekomendasi untuk berat badan kurang dari 60 kg:</strong> 
                <ul>
                    <li>Latihan Kekuatan: Menggunakan beban untuk meningkatkan massa otot.</li>
                    <li>Olahraga Berbasis Kekuatan: CrossFit atau Bodybuilding untuk meningkatkan kekuatan.</li>
                    <li>Makanan Sehat: Menambahkan sumber kalori yang sehat dalam diet.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Meningkatkan kekuatan otot, memperbaiki komposisi tubuh, meningkatkan metabolisme, dan membantu mencapai berat badan yang sehat.</li>
        `;
    } else {
        recommendations += `
            <li><strong>Rekomendasi untuk berat badan normal:</strong> 
                <ul>
                    <li>Olahraga Teratur: Mengkombinasikan kardiovaskular dan kekuatan.</li>
                    <li>Aktivitas Fisik Harian: Menjaga pola hidup aktif dengan berjalan kaki atau bersepeda.</li>
                    <li>Olahraga Tim: Seperti sepak bola atau basket untuk meningkatkan interaksi sosial.</li>
                </ul>
            </li>
            <li><strong>Dampak:</strong> Menjaga kesehatan secara keseluruhan, meningkatkan daya tahan, serta memperbaiki suasana hati.</li>
        `;
    }

    recommendations += '</ul>';
    recommendations += `
        <p>Olahraga harus disesuaikan dengan kondisi kesehatan dan tujuan individu. Pastikan untuk berkonsultasi dengan dokter atau pelatih profesional sebelum memulai program latihan baru. Selain itu, penting untuk menjaga hidrasi dan nutrisi yang tepat agar hasil latihan dapat maksimal.</p>
        <p>Rekomendasi ini bersifat umum, silakan sesuaikan dengan preferensi dan kebutuhan pribadi Anda untuk mencapai hasil yang optimal.</p>
    `;
    return recommendations;
}

// Fungsi untuk menghitung berat badan ideal
function calculateIdealWeight(height) {
    const minWeight = 18.5 * ((height / 100) ** 2);
    const maxWeight = 24.9 * ((height / 100) ** 2);
    return { min: minWeight, max: maxWeight };
}

// Fungsi untuk menghitung indikator BMI
function calculateBMIIndicator(bmi) {
    if (bmi < 18.5) return 20;
    if (bmi >= 18.5 && bmi < 24.9) return 50;
    if (bmi >= 25 && bmi < 29.9) return 75;
    return 100;
}

// Fungsi untuk mendapatkan warna BMI
function getBMIColor(bmi) {
    if (bmi < 18.5) return '#FFC300';
    if (bmi >= 18.5 && bmi < 24.9) return '#28A745';
    if (bmi >= 25 && bmi < 29.9) return '#FFC300';
    return '#DC3545';
}

// Fungsi untuk menghitung indikator kalori
function calculateCaloriesIndicator(calories) {
    if (calories < 1500) return 25;
    if (calories >= 1500 && calories < 2000) return 50;
    if (calories >= 2000 && calories < 2500) return 75;
    return 100;
}

// Fungsi untuk mendapatkan warna kalori
function getCaloriesColor(calories) {
    if (calories < 1500) return '#DC3545';
    if (calories >= 1500 && calories < 2000) return '#FFC300';
    if (calories >= 2000 && calories < 2500) return '#28A745';
    return '#28A745';
}

// Fungsi untuk mendapatkan informasi lemak tubuh
function getBodyFatInformation(weight, height, age) {
    const bodyFatPercentage = calculateBodyFatPercentage(weight, height, age);
    const fatCategory = getFatCategory(bodyFatPercentage);
    const healthImpact = getHealthImpact(fatCategory);

    return `
        <p>Persentase Lemak Tubuh: <strong>${bodyFatPercentage}%</strong></p>
        <p>Kategori Lemak Tubuh: <strong>${fatCategory}</strong></p>
        <p>Dampak Kesehatan: ${healthImpact}</p>
    `;
}

// Fungsi untuk menghitung persentase lemak tubuh
function calculateBodyFatPercentage(weight, height, age) {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    const bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
    return bodyFatPercentage.toFixed(2);
}

// Fungsi untuk mendapatkan kategori lemak tubuh
function getFatCategory(bodyFatPercentage) {
    if (bodyFatPercentage < 6) return 'Essential Fat';
    if (bodyFatPercentage >= 6 && bodyFatPercentage < 14) return 'Athletes';
    if (bodyFatPercentage >= 14 && bodyFatPercentage < 18) return 'Fitness';
    if (bodyFatPercentage >= 18 && bodyFatPercentage < 25) return 'Acceptable';
    return 'Obese';
}

// Fungsi untuk mendapatkan dampak kesehatan dari kategori lemak tubuh
function getHealthImpact(fatCategory) {
    switch (fatCategory) {
        case 'Essential Fat':
            return 'Lemak esensial diperlukan untuk fungsi tubuh yang sehat.';
        case 'Athletes':
            return 'Tingkat lemak tubuh yang rendah ini umumnya dimiliki oleh atlet.';
        case 'Fitness':
            return 'Lemak tubuh pada tingkat ini dianggap sehat dan bugar.';
        case 'Acceptable':
            return 'Tingkat lemak tubuh ini masih dianggap sehat.';
        case 'Obese':
            return 'Tingkat lemak tubuh ini meningkatkan risiko masalah kesehatan seperti penyakit jantung, diabetes, dan hipertensi.';
        default:
            return '';
    }
}

// Fungsi untuk menghasilkan jadwal latihan
function generateSchedule(experience, age, weight) {
    let schedule = '<ul>';

    const exercises = {
        HIIT: 'HIIT (30 menit)',
        Cycling: 'Bersepeda (45 menit)',
        Running: 'Lari (5 km)',
        Yoga: 'Yoga (30 menit)',
        StrengthTraining: 'Latihan Kekuatan (45 menit)',
        Swimming: 'Renang (30 menit)',
        Walking: 'Berjalan (30 menit)',
        LightStrength: 'Latihan Kekuatan Ringan (30 menit)',
        TaiChi: 'Tai Chi (30 menit)',
        Pilates: 'Pilates (30 menit)',
        Dance: 'Senam Dansa (30 menit)',
        Stretching: 'Peregangan (15 menit)',
        BodyWeightTraining: 'Latihan Beban Tubuh (45 menit)',
        Aerobics: 'Aerobik (30 menit)',
        GroupFitness: 'Kelas Kebugaran Grup (60 menit)',
        Zumba: 'Zumba (45 menit)',
        Kickboxing: 'Kickboxing (30 menit)',
        CircuitTraining: 'Pelatihan Sirkuit (45 menit)',
        Hiking: 'Mendaki (60 menit)',
        Rowing: 'Mendayung (30 menit)',
        FunctionalTraining: 'Latihan Fungsional (30 menit)',
    };

    // Jadwal berdasarkan pengalaman
    if (experience === 'ya') {
        schedule += `
            <li>Senin: ${exercises.HIIT} - Meningkatkan daya tahan jantung dan membakar lemak dengan cepat.</li>
            <li>Selasa: ${exercises.Cycling} - Latihan kardio yang mengurangi stres pada sendi.</li>
            <li>Rabu: ${exercises.Running} - Meningkatkan stamina dan kesehatan jantung.</li>
            <li>Kamis: ${exercises.Yoga} - Meningkatkan fleksibilitas dan kesehatan mental.</li>
            <li>Jumat: ${exercises.StrengthTraining} - Membangun kekuatan otot dan meningkatkan metabolisme.</li>
            <li>Sabtu: ${exercises.Swimming} - Latihan seluruh tubuh yang baik untuk paru-paru.</li>
            <li>Minggu: Istirahat atau ${exercises.Hiking} - Menghabiskan waktu di alam sambil berolahraga.</li>
        `;
    } else {
        schedule += `
            <li>Senin: ${exercises.Walking} - Latihan ringan yang cocok untuk pemula.</li>
            <li>Selasa: ${exercises.Cycling} - Menikmati aktivitas luar ruangan sambil meningkatkan kebugaran.</li>
            <li>Rabu: Lari (3 km) - Perlahan-lahan meningkatkan jarak dan kecepatan.</li>
            <li>Kamis: ${exercises.Yoga} - Meningkatkan keseimbangan dan fleksibilitas.</li>
            <li>Jumat: ${exercises.LightStrength} - Memperkenalkan latihan kekuatan dengan beban ringan.</li>
            <li>Sabtu: ${exercises.Swimming} - Menikmati waktu di kolam sambil berolahraga.</li>
            <li>Minggu: Istirahat atau ${exercises.Stretching} - Menjaga fleksibilitas dan mengurangi ketegangan otot.</li>
        `;
    }

    // Variasi latihan berdasarkan berat badan dan usia
    if (weight < 60) {
        schedule += `
            <li>Catatan: Fokus pada latihan kekuatan dan asupan kalori yang cukup untuk membantu penambahan massa otot.</li>
            <li>Rencana tambahan: 
                <ul>
                    <li>Latihan Kekuatan (Beban Ringan) - 3 set x 12 repetisi dengan fokus pada variasi seperti squat, deadlift, dan bench press.</li>
                    <li>Snack sehat: Tambahkan makanan tinggi protein seperti yogurt atau protein shake setelah latihan.</li>
                </ul>
            </li>
            <li>Saran: Pertimbangkan untuk melakukan latihan kekuatan 3 kali seminggu dengan menambah bobot secara bertahap.</li>
        `;
    } else if (weight > 90) {
        schedule += `
            <li>Catatan: Fokus pada latihan kardiovaskular dan diet rendah kalori untuk membantu penurunan berat badan.</li>
            <li>Rencana tambahan: 
                <ul>
                    <li>Kardio Ringan (Berjalan) - 30 menit setiap hari dengan variasi kecepatan untuk meningkatkan intensitas.</li>
                    <li>Minum banyak air sebelum dan sesudah latihan untuk hidrasi yang baik.</li>
                </ul>
            </li>
            <li>Saran: Gabungkan HIIT dan latihan ketahanan untuk hasil optimal, dengan penekanan pada diet sehat.</li>
        `;
    } else {
        schedule += `
            <li>Catatan: Menjaga keseimbangan antara latihan kekuatan dan kardiovaskular. Idealnya, lakukan kombinasi keduanya setiap minggu.</li>
            <li>Rencana tambahan: 
                <ul>
                    <li>Latihan Kekuatan (Moderate) - 3 set x 10 repetisi dengan fokus pada seluruh kelompok otot.</li>
                    <li>Kardio (Moderate) - 30 menit, 3 kali seminggu dengan variasi intensitas.</li>
                </ul>
            </li>
            <li>Saran: Cobalah untuk melakukan latihan sirkuit untuk meningkatkan efisiensi waktu dan hasil.</li>
        `;
    }

    if (age > 50) {
        schedule += `
            <li>Catatan: Disarankan untuk menambahkan latihan keseimbangan dan fleksibilitas seperti Tai Chi dan Pilates minimal dua kali seminggu.</li>
            <li>Rencana tambahan: 
                <ul>
                    <li>Senam Lanjut Usia - 2 kali seminggu untuk meningkatkan keseimbangan dan kekuatan.</li>
                    <li>Peregangan - 15 menit setelah setiap latihan untuk menjaga fleksibilitas dan mencegah cedera.</li>
                </ul>
            </li>
            <li>Saran: Bergabunglah dengan kelas kebugaran untuk orang dewasa lanjut usia untuk mendapatkan bimbingan yang tepat dan memotivasi diri.</li>
        `;
    }

    schedule += `
        <li>Rincian lebih lanjut: 
            <ul>
                <li>Setiap sesi latihan diakhiri dengan peregangan untuk mencegah cedera.</li>
                <li>Pastikan untuk melakukan pemanasan sebelum latihan dan pendinginan setelahnya.</li>
                <li>Jaga pola makan sehat dan seimbang untuk mendukung program latihan.</li>
                <li>Monitor kemajuan secara berkala untuk menyesuaikan program latihan jika diperlukan.</li>
                <li>Setiap bulan, evaluasi progres dan sesuaikan target untuk menjaga motivasi.</li>
            </ul>
        </li>
    `;

    schedule += '</ul>';
    return schedule;
}

// Fungsi untuk mensimulasikan kemajuan setelah 4 minggu
function simulateProgress(weight, experience, age) {
    let message = '';

    // Simulasi kemajuan berdasarkan pengalaman
    if (experience === 'ya') {
        message += `
            <p>Setelah 4 minggu, Anda dapat melihat peningkatan massa otot dan pengurangan lemak tubuh berkat latihan rutin yang terencana.</p>
            <p>Perkiraan penurunan berat badan: ${(weight * 0.05).toFixed(2)} kg</p>
            <p>Peningkatan kekuatan dan daya tahan tubuh juga diharapkan, dengan kemampuan untuk meningkatkan intensitas latihan.</p>
        `;
    } else {
        message += `
            <p>Setelah 4 minggu, Anda akan merasakan peningkatan stamina dan kesehatan secara keseluruhan.</p>
            <p>Perkiraan penurunan berat badan: ${(weight * 0.03).toFixed(2)} kg</p>
            <p>Perbaikan kebugaran kardiovaskular dan fleksibilitas tubuh, serta peningkatan mood berkat aktivitas fisik.</p>
        `;
    }

    // Simulasi kemajuan berdasarkan berat badan
    if (weight < 60) {
        message += `
            <p>Setelah 4 minggu, Anda akan melihat peningkatan massa otot dan berat badan berkat latihan kekuatan yang teratur.</p>
            <p>Perkiraan penambahan berat badan: ${(weight * 0.03).toFixed(2)} kg</p>
            <p>Peningkatan kekuatan dan kepadatan tulang juga diharapkan, yang bermanfaat untuk kesehatan jangka panjang.</p>
        `;
    } else if (weight >= 60 && weight <= 90) {
        message += `
            <p>Setelah 4 minggu, Anda akan merasakan peningkatan energi dan kemampuan untuk menyelesaikan latihan dengan lebih baik.</p>
            <p>Penurunan berat badan yang sehat dan stabil, dengan fokus pada pembentukan tubuh yang lebih baik.</p>
            <p>Perkiraan penurunan berat badan: ${(weight * 0.04).toFixed(2)} kg</p>
        `;
    } else {
        message += `
            <p>Setelah 4 minggu, Anda akan melihat peningkatan stamina dan pengurangan berat badan dengan rutinitas kardiovaskular yang intensif.</p>
            <p>Perkiraan penurunan berat badan: ${(weight * 0.06).toFixed(2)} kg</p>
            <p>Peningkatan kesehatan jantung dan penurunan risiko penyakit terkait berat badan berlebih.</p>
        `;
    }

    // Simulasi kemajuan berdasarkan usia
    if (age > 50) {
        message += `
            <p>Setelah 4 minggu, Anda mungkin akan merasakan peningkatan fleksibilitas dan keseimbangan berkat latihan yang lebih berfokus pada kesehatan.</p>
            <p>Latihan yang teratur dapat membantu mencegah cedera dan meningkatkan kualitas hidup.</p>
            <p>Perkiraan penurunan berat badan: ${(weight * 0.02).toFixed(2)} kg, dengan penekanan pada kesehatan jangka panjang.</p>
        `;
    }

    // Menambahkan catatan kesehatan
    message += `
        <p><strong>Catatan Kesehatan:</strong></p>
        <ul>
            <li>Pastikan untuk mengonsumsi cukup protein untuk mendukung pemulihan otot.</li>
            <li>Hidrasi yang baik sangat penting untuk performa dan pemulihan yang optimal.</li>
            <li>Monitor pola makan dan berusaha untuk mengonsumsi makanan seimbang untuk hasil yang lebih baik.</li>
            <li>Evaluasi kemajuan setiap bulan dan sesuaikan program latihan Anda jika diperlukan.</li>
        </ul>
    `;

    document.getElementById('simulationResult').innerHTML = message;
    document.getElementById('simulationResult').classList.remove('hidden');
}

