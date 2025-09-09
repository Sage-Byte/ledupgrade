// GHL Form Embed Script
(function() {
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'form:submit') {
      // Convert to expected format for our app
      const customEvent = new MessageEvent('message', {
        data: {
          type: 'ghl:formSubmitted',
          formData: event.data.data
        }
      });
      window.dispatchEvent(customEvent);
    }
  });
})();
