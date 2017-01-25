new Vue({
    el   : '#app',
    data : {
        prefix : '',
        css    : '',
        php    : '',
        before : ''
    },

    computed : {
        php : function () {
            if (this.prefix && this.css) {
                return this.generatePHP(this.prefix.trim(), this.css, this.before);
            }
        }
    },

    methods : {

        beforeClassPrefix : function (e) {
            this.before = event.target.getAttribute('before').trim();
        },

        generatePHP : function (prefix, css, before) {

            var match,
                phpcode  = [],
                $pattern = `.(${prefix}([^:|^"]+)):before`,
                $regexp  = new RegExp($pattern, "ig");

            while ((match = $regexp.exec(css)) !== null) {
                if (match[1].indexOf(".") == -1 || match[1].indexOf(",") == -1) {
                    let name = match[2].replace(/-/g, ' ').replace(/(\b\w)/gi, function (m) {return m.toUpperCase();});
                    phpcode.push(`\t'${before} ${match[1]}'=>'${name}'`);
                }
            }
            return `<?php \nreturn array(\n${phpcode.join(",\n")}\n);`;
        }
    }
});