new Vue({
    el   : '#app',
    data : {
        prefix : '',
        css    : '',
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

                phpcode   = [],
                $comments = /\/\*(?:(?!\*\/)[\s\S])*\*\//g,
                $pattern  = `.(${prefix}([^:|^"]+)):before`,
                $regexp   = new RegExp($pattern, "ig");

            css = css.replace($comments, '');

            while ((match = $regexp.exec(css)) !== null) {
                if (match[1].indexOf(".") == -1 || match[1].indexOf(",") == -1) {
                    let name = match[2].replace(/-/g, ' ').replace(/(\b\w)/gi, function (m) {return m.toUpperCase();});

                    let icon = `${before} ${match[1]}`.trim();

                    phpcode.push(`\t'${icon}'=>'${name}'`);

                    if (before == 'dashicons' && match[1] == 'dashicons-before') {
                        phpcode.shift();
                    }
                }
            }

            return `<?php \nreturn array(\n${phpcode.join(",\n")}\n);`;
        }
    }
});