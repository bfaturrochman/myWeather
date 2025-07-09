$(".search-button").on("click", function () {
    // console.log($(".input-keyword").val());

    // cari koordinat kota
    $.ajax({
        url:
            "http://api.openweathermap.org/geo/1.0/direct?q=" +
            $(".input-keyword").val() +
            "&limit=1&appid=624a711ecb1fff04c48850466b61a7d3",
        success: (result) => {
            result.forEach((m) => {
                //menampilkan data cuaca
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/weather?lat=${m.lat}&lon=${m.lon}&appid=624a711ecb1fff04c48850466b61a7d3&units=metric&lang=id`,
                    success: (result) => {
                        let cards = "";
                        const cuaca = result.weather;

                        cuaca.forEach((w) => {
                            console.log("Kondisi:", w.main);
                            console.log("Deskripsi:", w.description);
                            // console.log("Icon:", w.icon);

                            const cuacaDetail = `<div class="card weather-card border-0">
                        <div class="card-body ">
                            
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h4 class="card-title mb-0">${result.name}</h4>
                                    <small class="text-muted">${result.sys.country}</small>
                                </div>
                                <img src="https://openweathermap.org/img/wn/${w.icon}.png" alt="Cuaca" class="weather-icon" />
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <strong>🌤 Cuaca Umum</strong><br />
                                    <span class="badge bg-info text-dark">${w.main}</span><br />
                                    Deskripsi: ${w.description}
                                </li>
                                <li class="list-group-item">
                                    <strong>🌡️ Suhu</strong><br />
                                    Saat ini: <span class="badge bg-primary">${result.main.temp}°C</span><br />
                                    Terasa seperti: <span class="badge bg-warning text-dark">${result.main.feels_like}°C</span>
                                </li>
                                <li class="list-group-item">
                                    <strong>💧 Kelembapan & Tekanan</strong><br />
                                    Kelembapan: ${result.main.humidity}%
                                </li>
                                <li class="list-group-item">
                                    <strong>🌬️ Angin</strong><br />
                                    Kecepatan: ${result.wind.speed} m/s<br />
                                    Arah: ${result.wind.deg}°
                                </li>
                                <li class="list-group-item">
                                    <strong>☁️ Awan</strong><br />
                                    Tutupan: ${result.clouds.all}%
                                </li>
                            </ul>
                            <div class="text-end mt-3">
                                <small class="text-muted"> Perkiraan cuaca terkadang tidak akurat untuk beberapa lokasi</small>
                            </div>
                        </div>
                    </div>`;
                            $(".cuaca-container").html(cuacaDetail);
                        });

                        // console.log("Lokasi:", result.name);

                        // console.log("Suhu:", result.main.temp);
                        // console.log("Terasa seperti:", result.main.feels_like);

                        // console.log("Kelembapan:", result.main.humidity);

                        // console.log("Kecepatan angin:", result.wind.speed);
                        // console.log("Arah angin:", result.wind.deg);
                        // console.log("tutupan awan:", result.clouds.all);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    },
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        },
    });
});
