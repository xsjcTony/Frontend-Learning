;(function ($, window) {
  $.extend({
    /**
     * Add cookie.
     * @param {string} key - Key of the cookie.
     * @param {string} value - Value of the cookie.
     * @param {number} [expiryDays] - Expire time in days of the cookie in GMT format.
     * @param {string} [path] - Path of the cookie.
     * @param {string} [domain] - Domain of the cookie.
     */
    addCookie: function (key, value, expiryDays, path, domain) {
      // deal with default arguments value
      path = path || window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/"));
      domain = domain || document.domain;
      if(!expiryDays) {
        document.cookie = `${key}=${value};path=${path};domain=${domain};`;
      } else {
        let date = new Date();
        date.setDate(date.getDate() + expiryDays);
        document.cookie = `${key}=${value};expires=${expiryDays};path=${path};domain=${domain};`;
      }
    },

    /**
     * Get cookie value based on given key.
     * @param {string} key - Key of the cookie to search for.
     * @returns {string} - The value of the cookie, undefined if key is not found.
     */
    getCookie: function (key) {
      let res = document.cookie.split(";");
      for(let i = 0; i < res.length; i++) {
        let temp = res[i].split("=");
        if(temp[0].trim() === key) {
          return temp[1];
        }
      }
    },

    /**
     * Delete cookie based on given key.
     * @param {string} key - Key of the cookie to be deleted.
     * @param {string} [path] - Path of the cookie to be deleted.
     */
    deleteCookie: function (key, path) {
      if(path) {
        $.addCookie(key, $.getCookie(key), -1, path);
      } else {
        $.addCookie(key, $.getCookie(key), -1);
      }
    }
  });
})(jQuery, window);