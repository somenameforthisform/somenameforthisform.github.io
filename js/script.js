$(function () {
  //Данные товара
  const products = [
    {
      name: "foieGras",
      checked: false,
      disabled: false,
      comment: "Печень утки разварная с артишоками",
      commentDisabled: "Печалька, с фуа-гра закончился.",
    },
    {
      name: "fish",
      checked: true,
      disabled: false,
      comment: "Головы щучьи с чесноком да свежайшая семгушка",
      commentDisabled: "Печалька, с рыбой закончился.",
    },
    {
      name: "chicken",
      checked: false,
      disabled: true,
      comment: "Филе из цеплят с трюфелями в бульоне",
      commentDisabled: "Печалька, с курой закончился.",
    },
  ];

  //Текст по-умолчанию
  const defaultText = {
    descriptionDefault: "Сказочное заморское яство",
    descriptionHover: "Котэ не одобряет?",
    commentDefaultHtml: "Чего сидишь? Порадуй котэ, <span>купи</span>",
  };

  //Парсинг массива
  const productsParsing = (function () {
    products.map((object) => {
      if (object.disabled & (object.checked === true)) {
        console.error(
          'продукт "' +
            object.name +
            '" одновременно активирован и заблокирован, проверь массив'
        );
      } else if (object.disabled) {
        $(`.${object.name} .treat-fakeborder`).toggleClass("disabled_block");
        $(`.${object.name} .circle`).toggleClass("disabled_block");
        $(`.${object.name} .treat-description`).toggleClass("disabled_text");
        $(`.${object.name} .treat`).toggleClass("disabled_image");
        $(`.${object.name} .comment`).append(object.commentDisabled);
        $(`.${object.name} .comment`).toggleClass("disabled_comment");
      } else if (object.checked) {
        $(`.${object.name} .treat-fakeborder`).toggleClass("checked_block");
        $(`.${object.name} .circle`).toggleClass("checked_block");
        $(`.${object.name} .comment`).append(object.comment);
      } else {
        $(`.${object.name} .comment`).append(defaultText.commentDefaultHtml);
      }
    });
  })();

  //Обработчики событий

  $(".product").click(function () {
    let thisProduct = products[$(this).index()];
    if (
      (event.target.className != "comment") &
      (event.target.className.substring(0, 7) != "product") &
      !thisProduct.disabled
    ) {
      thisProduct.checked = !thisProduct.checked;
      $(`.${thisProduct.name} .treat-fakeborder`).toggleClass("checked_block");
      $(`.${thisProduct.name} .circle`).toggleClass("checked_block");
      $(`.${thisProduct.name} .description_top`).html(
        defaultText.descriptionDefault
      );

      if (thisProduct.checked) {
        $(`.${thisProduct.name} .comment`).html(thisProduct.comment);
      } else {
        $(`.${thisProduct.name} .comment`).html(defaultText.commentDefaultHtml);
      }
    }
  });

  $(".product").mouseenter(function () {
    if (event.target.className != "comment") {
      let thisProduct = products[$(this).index()];
      if (thisProduct.checked) {
        $(`.${thisProduct.name} .description_top`).html(
          defaultText.descriptionHover
        );
      }
    }
  });

  $(".product").mouseleave(function () {
    let thisProduct = products[$(this).index()];
    if (thisProduct.checked) {
      $(`.${thisProduct.name} .description_top`).html(
        defaultText.descriptionDefault
      );
    }
  });
});
