# Well Mask Money

Simple library to mask currency inputs.

Is this just one more js lib? No!

`it does not need jQuery` and it's easy allow allow 0 and empty at same time, 
which is a commom problem on another libraries.

[Demonstration here](https://wellingtonnico.github.io/well_mask_money/)


## How to use

Just put the script in your html template. You can do it like this:

```html
<!-- well mask money cdn -->
<script src="https://cdn.jsdelivr.net/gh/WellingtonNico/well_mask_money/well_mask_money.js"></script>
```

Then configure the inputs you wannt to apply the money mask by adding some data attributes:

* `data-toggle`: it's value should be `well-mask-money` to automatically trigger setup
* `data-locales`: language - default "pt-br"
* `data-currency`: currenty - default "BRL"
* `data-allow-empty`: allow empty(except if required) - default "true"
* `data-allow-negative`: allow negative value - default "true"
* `data-use-currency-symbol`: use currency symbol - default "true"
* `data-decimal-places`: decimal places - default 2


## Client side validation

If you need to get the real number for some custom client side validation 
you can get the real value by catching the attribute `numberValue` from the input element like this:

```javascript
const input = document.getElementById('my-well-masked-input')
if (input.numberValue < 1){
    input.classList.add('is-invalid')
}
```


## Manually trigger mask

Sometimes you need to change an input value directly with javascript, 
but it does not trigger any event. 
Don't worry! 
You can manually trigger mask by using the function `applyWellMaskMoney` 
or by calling the function `wellMaskMoneyListener` from the input itself like this:

```javascript
const input = document.getElementById('my-well-masked-input')

// like this
input.value = 33.33
input.wellMaskMoneyListener()

// or like this
input.value = input.applyWellMaskMoney(33.33)
```

### be happy!