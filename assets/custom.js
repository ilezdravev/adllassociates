/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

$(document).ready(function() {
  if($('.product-gallery__thumbnail-list').length > 0){
    $('.product-gallery__thumbnail-list a.product-gallery__thumbnail').each(function(){
      $(this).removeAttr("target");
    });
  }
  
  document.addEventListener('variant:changed', function(event) {
    var variant = event.detail.variant;
    
    if(!variant){
      $('.save-section').hide();
    } else {
      var discountLabeld = $('.percentage-sell');

      if (variant['compare_at_price'] > variant['price']) {
        var savingsd = Math.round((variant['compare_at_price'] - variant['price']) * 100 / variant['compare_at_price']) + '%';
        $('.save-section').show();
        discountLabeld.removeClass('hide').html("("+savingsd+")");
      } else {
        discountLabeld.addClass('hide');
        $('.save-section').hide();
      }
    }
 });
  
   if (window.matchMedia('(max-width: 640px)').matches) {
       $( ".product-block-list__item.hidden-tablet-and-up .product-meta__reference" ).append( $( "#wishlist-hero-product-page-button" ) );
    }
 
});