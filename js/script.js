const filterByType = (
    type,
    ...values //объявление функции с аргументами type и values
  ) => values.filter((value) => typeof value === type), //фильтрация элементов массива (тип элемента массива values должен быть равен типу из type)
  hideAllResponseBlocks = () => {
    //объявление функции
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    ); //создаемм массив из HTML-коллеции блоков div с заданым классом
    responseBlocksArray.forEach((block) => (block.style.display = "none")); //всем элементам из массива присваеваем display = 'none'
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //объявление функции с аргументами blockSelector, msgText, spanSelector
    hideAllResponseBlocks(); //вызов функции hideAllResponseBlocks
    document.querySelector(blockSelector).style.display = "block"; //показываем элемент DOM с селектором blockSelector
    if (spanSelector) {
      //если эелемент DOM с селектором spanSelector существует
      document.querySelector(spanSelector).textContent = msgText; //присваеваем эелементу DOM с селектором spanSelector содержимое из msgText
    }
  },
  showError = (
    msgText //объявление функции с аргументом msgText
  ) => showResponseBlock(".dialog__response-block_error", msgText, "#error"), // вызов функции showResponseBlock с передачей в нее нужных аргуметов
  showResults = (
    msgText //объявление функции с аргументом msgText
  ) => showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), // вызов функции showResponseBlock с передачей в нее нужных аргуметов
  showNoResults = () =>
    //объявление функции с аргументом msgText
    showResponseBlock(".dialog__response-block_no-results"), // вызов функции showResponseBlock с передачей в нее нужных аргуметов
  tryFilterByType = (type, values) => {
    //объявление функции с аргументами type, values
    try {
      //попробуй выполнить код
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //объявление константы для строки, которя будет выполняться методом eval, полученный в результате массив преобразуется в строку, с разделением элементов через запятую
      const alertMsg = valuesArray.length //если в valuesArray что-то есть, то
        ? `Данные с типом ${type}: ${valuesArray}` //если условие выполнено, присвоить alertMsg строку
        : `Отсутствуют данные типа ${type}`; //иначе присвоить alertMsg другую строку
      showResults(alertMsg); // вызов функции showResults с передачей в нее нужных аргуметов
    } catch (e) {
      // если ошибка в коде, то
      showError(`Ошибка: ${e}`); // вызов функции showError с передачей в нее нужных аргуметов
    }
  };

const filterButton = document.querySelector("#filter-btn"); // объявление константы для DOM-элемента с селектором #filter-btn

filterButton.addEventListener("click", (e) => {
  //обработчик события "click" для filterButton
  const typeInput = document.querySelector("#type"); // объявление константы для DOM-элемента с селектором #type
  const dataInput = document.querySelector("#data"); // объявление константы для DOM-элемента с селектором #data

  if (dataInput.value === "") {
    //если значение dataInput пустая строка
    dataInput.setCustomValidity("Поле не должно быть пустым!"); //специальное сообщение для  выбранного элемента
    showNoResults(); // вызов функции showNoResults
  } else {
    // иначе
    dataInput.setCustomValidity(""); //специальное сообщение для  выбранного элемента
    e.preventDefault(); //отмена базового действия при событии "click"
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызов функции tryFilterByType с передачей в нее нужных аргуметов
  }
});
