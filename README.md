# Well Mask Money

Simple library to mask currency inputs

`it does not need jQuery`

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

If you need to get the real number for some custom client side validation you can get the real value by catching the attribute `numberValue` from the input element like this:

```javascript
const input = document.getElementById('my-well-masked-input')
if (input.numberValue < 1){
    input.classList.add('is-invalid')
}
```

### be happy!