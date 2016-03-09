if (!xtag.tags['w-code']) {

    xtag.register('w-code', {
        accessors: {
            id: {
                attribute: {}
            },
            title: {
                attribute: {}
            },
            type: {
                attribute: {}
            },
            highlight: {
                attribute: {}
            },
            src: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function () {
                var uid = org.wiedza.services.getIdOrGeneratedId(this.id, "code");

                var options = {
                    id: uid,
                    title: this.title,
                    type: this.type,
                    highlight: this.highlight,
                    src: this.src,
                    xtag: $(this)
                };

                window[uid] = new org.wiedza.webBook.components.Code(options);
            }
        }
    });
}
