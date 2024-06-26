(() => {
  function _getWellMaskedInputs(parentNode) {
    return [...parentNode.querySelectorAll('[data-toggle="well-mask-money"]')];
  }

  function _setupWellMaskMoneyOn(input) {
    let {
      allowEmpty,
      allowNegative,
      useCurrencySymbol,
      decimalPlaces,
      locales,
      currency,
    } = input.dataset;

    currency = currency || "BRL";
    locales = locales || "pt-br";
    allowEmpty = (allowEmpty || "true").toLocaleLowerCase() == "true";
    allowNegative = (allowNegative || "true").toLocaleLowerCase() == "true";
    useCurrencySymbol =
      (useCurrencySymbol || "true").toLocaleLowerCase() == "true";
    decimalPlaces = Number(decimalPlaces || 2);

    // string usada para verificar se foi apagado o último dígito
    // ex: se era 0,00 e agora é 0,0 então o usuário quis apagar o valor todo
    const emptyTrigger = new Array(1 + decimalPlaces).join("0");

    const _formatCurrency = (value) => {
      if (value < 0 && !allowNegative) {
        value = -value;
      }
      return Number(value).toLocaleString(
        locales,
        useCurrencySymbol
          ? {
              minimumFractionDigits: decimalPlaces,
              style: "currency",
              currency: currency,
            }
          : { minimumFractionDigits: decimalPlaces }
      );
    };

    const _wellMaskMoneyListener = () => {
      const isNegative = input.value.includes("-");
      const convertToPositive = input.value.includes("+");
      const cleanedString = input.value.replace(/\D+/g, "");
      let numberValue = Number(cleanedString || 0) / 10 ** decimalPlaces;
      if (isNegative && !convertToPositive) {
        // converte pra negativo somente se necessário
        numberValue = -numberValue;
      }
      input.numberValue = cleanedString.length === 0 ? null : numberValue;
      let newValue;
      if (cleanedString === emptyTrigger || cleanedString.length === 0) {
        // se o campo foi limpo
        if (!allowEmpty || input.required) {
          // se não permite vazio preenche o campo na força
          newValue = _formatCurrency(0);
        } else if (cleanedString.length === 0 || input.lastNumberValue === 0) {
          // se o campo já está limpo mantém limpo ou o último valor já era 0
          newValue = "";
        } else {
          // formata zerado pro usuário poder apertar mais uma vez no backspace
          newValue = _formatCurrency(0);
        }
      } else {
        newValue = _formatCurrency(numberValue);
      }
      input.lastNumberValue = numberValue;
      input.value = newValue;
      return newValue;
    };
    input.applyWellMaskMoney = _formatCurrency;
    input.wellMaskMoneyListener = _wellMaskMoneyListener;
    // add the events needed to the input
    ["input", "change", "focus"].forEach((eventType) =>
      input.addEventListener(eventType, _wellMaskMoneyListener)
    );
    // the type needed is text
    input.type = "text";
    // runs for the first time
    _wellMaskMoneyListener();
  }

  function _setupWellMaskMoneyOnInputs() {
    const obvserver = new MutationObserver(() => {
      const inputs = _getWellMaskedInputs(document);
      inputs.forEach((input) => {
        if (!input.wellMaskMoneyConfigured) {
          _setupWellMaskMoneyOn(input);
          input.wellMaskMoneyConfigured = true;
        }
      });
    });

    obvserver.observe(document, { subtree: true, childList: true });
  }

  _setupWellMaskMoneyOnInputs();
})();
