function delay(segundos) {
    let ms = segundos * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

delay(10).then(() => {
    console.log("Execução da função delay (10) finalizada!");
});

delay(5).then(() => {
    console.log("Execução da função delay (5) finalizada!");
});