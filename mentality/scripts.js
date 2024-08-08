document.getElementById('mentalHealthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const scores = [
        parseInt(document.getElementById('question1').value),
        parseInt(document.getElementById('question2').value),
        parseInt(document.getElementById('question3').value),
        parseInt(document.getElementById('question4').value),
        parseInt(document.getElementById('question5').value)
    ];

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / scores.length;
    const scorePercentage = (averageScore / 5) * 100;

    // Mental health categories and related information
    const mentalHealthCategory = getMentalHealthCategory(scores, averageScore);
    const mentalHealthColor = getMentalHealthColor(averageScore);
    const mentalHealthAdvice = getMentalHealthAdvice(scores, averageScore);
    const additionalInsights = getAdditionalInsights(scores, averageScore);
    const causeEffectAnalysis = getCauseEffectAnalysis(scores);
    const copingStrategies = getCopingStrategies(scores);
    const supportSystems = getSupportSystems(scores);
    const lifestyleFactors = getLifestyleFactors(scores);

    const resultContent = `
    <div class="result-container">
        <div class="indicator-container">
            <h3>Skor Kesehatan Mental</h3>
            <div class="indicator">
                <div class="indicator-fill" style="width: ${scorePercentage}%; background-color: ${mentalHealthColor};"></div>
            </div>
            <p>Skor Kesehatan Mental Anda: <strong>${averageScore.toFixed(2)}</strong></p>
            <p>Kategori: <strong>${mentalHealthCategory}</strong></p>
        </div>

        <h3>Saran untuk Kesehatan Mental</h3>
        <p><strong>${mentalHealthAdvice}</strong></p>
        <p>Untuk menjaga dan meningkatkan kesehatan mental Anda, pertimbangkan hal-hal berikut:</p>
        <ul>
            <li>Luangkan waktu untuk diri sendiri dan lakukan aktivitas yang Anda nikmati, seperti membaca, berkebun, atau mendengarkan musik.</li>
            <li>Jadwalkan waktu untuk berolahraga, karena aktivitas fisik dapat meningkatkan suasana hati dan mengurangi stres. Cobalah berjalan kaki, yoga, atau bersepeda.</li>
            <li>Buatlah jadwal rutin untuk tidur dan bangun yang konsisten. Tidur yang cukup adalah kunci untuk kesehatan mental yang baik.</li>
            <li>Jangan ragu untuk mencari bantuan profesional jika diperlukan. Terapis atau konselor dapat memberikan dukungan dan alat yang diperlukan untuk mengatasi masalah.</li>
        </ul>
        <p>Ingatlah bahwa setiap langkah kecil menuju kesehatan mental lebih baik adalah hal yang berarti.</p>

        <h3>Penjelasan Kesehatan Mental</h3>
        <p>${getCategoryExplanation(averageScore, scores)}</p>
        <p>Penting untuk memahami bahwa kesehatan mental mencakup bagaimana kita berpikir, merasa, dan berperilaku. Jika Anda merasa terjebak atau bingung, berbicaralah dengan seseorang untuk membantu Anda melihat situasi dari perspektif baru.</p>

        <h3>Wawasan Tambahan</h3>
        <p>${additionalInsights}</p>
        <p>Memahami pola perilaku Anda dapat membantu Anda menemukan solusi yang lebih baik untuk masalah yang mungkin Anda hadapi. Cobalah untuk mencatat perasaan Anda setiap hari dan melihat apakah ada pola yang muncul.</p>
        <p>Ingatlah, banyak orang mengalami tantangan yang sama, dan berbagi pengalaman dapat membantu.</p>

        <h3>Sebab dan Akibat</h3>
        <p>${causeEffectAnalysis}</p>
        <p>Penting untuk mencatat bagaimana tindakan dan pikiran kita saling memengaruhi. Misalnya, jika Anda merasa cemas, mungkin Anda cenderung menarik diri dari interaksi sosial. Identifikasi faktor pemicu dapat membantu Anda mengambil langkah-langkah yang tepat untuk perubahan positif.</p>

        <h3>Strategi Coping</h3>
        <p>${copingStrategies}</p>
        <p>Berikut adalah beberapa teknik tambahan yang dapat membantu Anda mengelola stres dan meningkatkan kesejahteraan:</p>
        <ul>
            <li>Menulis jurnal untuk mengungkapkan perasaan dan pemikiran Anda. Ini bisa membantu Anda memproses emosi dan menemukan solusi.</li>
            <li>Berpartisipasi dalam kelompok dukungan untuk berbagi pengalaman dengan orang lain. Mendengar orang lain dapat memberikan perspektif baru.</li>
            <li>Mencoba teknik relaksasi seperti meditasi, mindfulness, atau teknik pernapasan untuk menenangkan pikiran.</li>
            <li>Mengatur waktu tidur yang cukup dan berkualitas untuk meningkatkan suasana hati. Tidur yang buruk dapat memperburuk masalah kesehatan mental.</li>
            <li>Melibatkan diri dalam hobi yang Anda nikmati, seperti melukis, menulis, atau berolahraga, untuk meningkatkan suasana hati Anda.</li>
        </ul>

        <h3>Sistem Dukungan</h3>
        <p>${supportSystems}</p>
        <p>Ingatlah bahwa Anda tidak sendirian. Berbagi perasaan dengan seseorang yang Anda percayai dapat menjadi langkah awal yang baik. Diskusikan tantangan yang Anda hadapi dengan teman atau anggota keluarga yang mendukung.</p>
        <p>Jika Anda merasa nyaman, pertimbangkan untuk bergabung dengan komunitas atau grup yang memiliki minat yang sama, di mana Anda bisa mendapatkan dukungan dan mengembangkan hubungan yang positif.</p>

        <h3>Faktor Gaya Hidup</h3>
        <p>${lifestyleFactors}</p>
        <p>Pertimbangkan perubahan gaya hidup kecil yang dapat memberikan dampak besar pada kesehatan mental Anda. Ini termasuk:</p>
        <ul>
            <li>Menjaga pola makan yang seimbang dan bergizi. Makanan sehat berkontribusi pada suasana hati yang lebih baik.</li>
            <li>Berusaha untuk aktif secara fisik, baik dengan berolahraga secara teratur atau hanya dengan berjalan kaki setiap hari.</li>
            <li>Meluangkan waktu di alam dapat membantu meningkatkan kesejahteraan mental. Cobalah untuk menghabiskan waktu di luar ruangan.</li>
        </ul>
        <p>Setiap langkah kecil dapat membantu meningkatkan kesehatan mental Anda secara keseluruhan.</p>

        <h3>Langkah Selanjutnya</h3>
        <p><strong>${getNextSteps(averageScore, scores)}</strong></p>
        <p>Memahami langkah-langkah yang perlu diambil selanjutnya adalah kunci untuk meningkatkan kesehatan mental. Jangan ragu untuk menghubungi profesional jika Anda merasa perlu. Mencari bantuan adalah tanda kekuatan, bukan kelemahan.</p>
        <p>Jika Anda merasa sudah siap, pertimbangkan untuk menetapkan tujuan kecil dan terukur untuk meningkatkan kesehatan mental Anda, seperti membaca satu buku tentang kesehatan mental setiap bulan atau mengikuti kelas yoga.</p>
    </div>
`;


    document.getElementById('mentalHealthResult').innerHTML = resultContent;
    document.getElementById('mentalHealthResult').classList.remove('hidden');
    document.getElementById('mentalHealthForm').classList.add('hidden');

    // Show input restart and download buttons
    document.getElementById('buttonContainer').classList.remove('hidden');

    // Function to download PDF
    document.getElementById('downloadButton').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // PDF title
        doc.setFontSize(16);
        doc.text("Hasil Penilaian Kesehatan Mental", 10, 10);
        doc.setFontSize(12);

        // Get result content and write to PDF
        const resultContainer = document.getElementById('mentalHealthResult');
        const resultText = resultContainer.innerText || resultContainer.textContent;

        // Split content into parts to avoid exceeding page limits
        const lines = doc.splitTextToSize(resultText, 190);
        doc.text(lines, 10, 20);

        // Save PDF
        doc.save("hasil_penilaian_kesehatan_mental.pdf");
    });

    // Function for restarting input
    document.getElementById('restartButton').addEventListener('click', function() {
        document.getElementById('mentalHealthForm').classList.remove('hidden');
        document.getElementById('mentalHealthResult').classList.add('hidden');
        document.getElementById('buttonContainer').classList.add('hidden');
        document.getElementById('mentalHealthForm').reset();
    });
});

// Function to get mental health category based on score distribution
function getMentalHealthCategory(scores, averageScore) {
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    if (minScore >= 1 && maxScore <= 2) return 'Sangat Baik';
    if (averageScore >= 1 && averageScore < 2) return 'Baik';
    if (averageScore >= 2 && averageScore < 3) return 'Sedang';
    if (averageScore >= 3 && averageScore < 4) return 'Buruk';
    return 'Sangat Buruk';
}

// Function to get mental health color indicator
function getMentalHealthColor(score) {
    if (score >= 1 && score < 2) return '#28A745'; // Green - Good
    if (score >= 2 && score < 3) return '#FFC300'; // Yellow - Moderate
    if (score >= 3 && score < 4) return '#DC3545'; // Red - Bad
    return '#8B0000'; // Dark Red - Very Bad
}

// Function to get mental health advice
function getMentalHealthAdvice(scores, averageScore) {
    const stressLevel = getStressLevel(scores);
    let advice = '';

    switch (true) {
        case (averageScore >= 1 && averageScore < 2):
            advice = `Kesehatan mental Anda berada pada tingkat yang baik. Untuk mempertahankannya, pertimbangkan untuk:
            Olahraga teratur, Aktivitas fisik dapat meningkatkan mood dan mengurangi stres.
            Menjaga hubungan sosial, Habiskan waktu dengan teman dan keluarga untuk meningkatkan dukungan emosional.
            Memastikan tidur yang cukup, Tidur berkualitas sangat penting untuk kesehatan mental.
            ${stressLevel === 'Rendah' ? 'Anda juga memiliki tingkat stres yang rendah, yang sangat positif untuk keseimbangan mental.' : ''}`;
            break;

        case (averageScore >= 2 && averageScore < 3):
            advice = `Kesehatan mental Anda dalam kondisi sedang. Ini bisa menjadi indikasi bahwa Anda menghadapi beberapa stres. Cobalah untuk:
            Melibatkan diri dalam kegiatan relaksasi. Yoga, meditasi, atau teknik pernapasan dapat membantu mengurangi stres.
            Meningkatkan interaksi sosial, Pertimbangkan untuk bergabung dengan grup atau komunitas yang memiliki minat yang sama.
            Mengelola waktu dengan lebih efektif, Buatlah daftar tugas untuk menghindari tekanan akibat pekerjaan yang menumpuk.
            ${stressLevel === 'Sedang' ? 'Perhatikan tanda-tanda stres yang dapat mempengaruhi Anda, seperti mudah marah atau sulit tidur.' : ''}`;
            break;

        case (averageScore >= 3 && averageScore < 4):
            advice = `Anda mungkin mengalami kesulitan dengan kesehatan mental Anda saat ini. Pertimbangkan untuk:
            Mencari bantuan dari profesional kesehatan mental, Terapis atau konselor dapat memberikan dukungan yang Anda butuhkan.
            Berbicara dengan orang-orang terdekat, Jangan ragu untuk berbagi perasaan Anda dengan orang yang Anda percayai.
            Mencoba teknik manajemen stres, Pelajari cara-cara baru untuk mengelola stres, seperti mindfulness atau journaling.
            ${stressLevel === 'Tinggi' ? 'Tingkat stres Anda tinggi, yang bisa memperburuk kondisi mental. Sangat penting untuk mencari dukungan segera.' : ''}`;
            break;

        default:
            advice = `Kesehatan mental Anda berada dalam kondisi kritis. Segera cari bantuan profesional.
            Prioritaskan keselamatan diri, Jika Anda merasa tertekan atau memiliki pikiran untuk menyakiti diri sendiri, hubungi layanan darurat.
            Jangan ragu untuk mencari bantuan, Terapis dapat membantu Anda menemukan cara untuk menghadapi situasi ini.
            Dukungan sosial, Berbicara dengan teman atau keluarga dapat memberikan perspektif dan dukungan yang Anda butuhkan.
            ${stressLevel === 'Sangat Tinggi' ? 'Tingkat stres Anda sangat tinggi dan memerlukan perhatian segera. Anda tidak sendirian dalam hal ini; banyak orang mengalami masa sulit, dan bantuan tersedia.' : ''}`;
            break;
    }

    // Add general explanation about the importance of mental health
    advice += `\n\nPentingnya Kesehatan Mental, 
    Kesehatan mental yang baik membantu kita menjalani hidup yang seimbang dan produktif. 
    Ini memengaruhi cara kita berpikir, merasa, dan bertindak. 
    Menjaga kesehatan mental sangat penting untuk mencapai potensi penuh kita dan berfungsi dengan baik dalam kehidupan sehari-hari. 
    Jangan ragu untuk mencari dukungan jika Anda merasa perlu.`;

    return advice;
}

// Function to get additional insights
function getAdditionalInsights(scores, averageScore) {
    const uniqueResponses = new Set(scores);
    const responseDistribution = {};

    uniqueResponses.forEach(score => {
        responseDistribution[score] = scores.filter(s => s === score).length;
    });

    return `Distribusi jawaban Anda:
    - Skor 1: ${responseDistribution[1] || 0}
    - Skor 2: ${responseDistribution[2] || 0}
    - Skor 3: ${responseDistribution[3] || 0}
    - Skor 4: ${responseDistribution[4] || 0}
    - Skor 5: ${responseDistribution[5] || 0}`;
}

// Function to analyze cause and effect based on scores
function getCauseEffectAnalysis(scores) {
    const analysis = scores.map((score, index) => `Pertanyaan ${index + 1}: Skor ${score}`).join(', ');
    return `Analisis Sebab dan Akibat, Berdasarkan skor yang Anda berikan, berikut adalah analisis: ${analysis}.`;
}

// Function to get coping strategies
function getCopingStrategies(scores) {
    const strategies = [
        "Berlatih teknik pernapasan dalam untuk meredakan kecemasan.",
        "Menjaga rutinitas harian yang teratur.",
        "Melakukan aktivitas fisik secara teratur untuk mengurangi stres.",
        "Mencoba kegiatan baru untuk meningkatkan suasana hati."
    ];
    return `Strategi Coping, Berikut beberapa strategi coping yang dapat membantu Anda: ${strategies.join(', ')}.`;
}

// Function to get support systems
function getSupportSystems(scores) {
    return `Sistem Dukungan. Penting untuk memiliki dukungan dari teman, keluarga, atau profesional. Jangan ragu untuk berbagi perasaan Anda.`;
}

// Function to get lifestyle factors
function getLifestyleFactors(scores) {
    return `Faktor Gaya Hidup. Pastikan Anda cukup tidur, makan dengan baik, dan berolahraga secara teratur. Ini semua berkontribusi pada kesehatan mental yang lebih baik.`;
}

// Function to determine stress level
function getStressLevel(scores) {
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (averageScore <= 2) return 'Rendah';
    if (averageScore <= 3) return 'Sedang';
    return 'Tinggi';
}

// Function to get next steps based on scores
function getNextSteps(averageScore, scores) {
    if (averageScore < 2) {
        return "Pertahankan kebiasaan baik ini dan terus jaga kesehatan mental Anda.";
    } else if (averageScore < 3) {
        return "Pertimbangkan untuk berbicara dengan seseorang jika Anda merasa terbebani.";
    } else {
        return "Sangat penting untuk mencari bantuan profesional untuk mendukung kesehatan mental Anda.";
    }
}

// Function to get category explanation based on average score
function getCategoryExplanation(averageScore, scores) {
    if (averageScore < 2) {
        return "Anda berada dalam kondisi kesehatan mental yang baik. Terus jaga keseimbangan hidup dan kesehatan mental.";
    } else if (averageScore < 3) {
        return "Anda dalam kondisi kesehatan mental yang sedang. Penting untuk terus memperhatikan diri Anda dan mencari dukungan jika perlu.";
    } else {
        return "Kesehatan mental Anda mungkin memerlukan perhatian lebih. Pertimbangkan untuk berbicara dengan profesional.";
    }
}
