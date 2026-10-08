export function validateSecSource(source) {
    // console.log('secondsource', source);
    if (!source || !Array.isArray(source)) {
        throw new TypeError('Второй источник: должен быть массивом');
    }
    if (source.length === 0) {
        console.info('secondsource', 'Второй источник: во втором источнике нет транзаций');
        return true;
    }
    //проверка элементов массива на строку
    for (const item of source) {
        if (typeof item !== 'string') {
            throw new TypeError('Второй источник: Элемент массива должен быть строкой');
        }
        if (!Number(item.split(" ")[0])) {
            throw new TypeError('Второй источник: Элемент массива должен содержать cумму транзации');
        }
    }
    return true;
}