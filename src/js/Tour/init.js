/* globals Tour, Lang, BrouserInfo, UI*/

Tour.init = function(data, options) {
    this.sentry();
    console.info('Tour-player', 'v' + this.version.join('.'), 'by http://Tour-360.ru');
    BrouserInfo();
    this.options.set(this.defaultOption);
    this.options.set(options);
    this.options.set(Tour.query.get());
    Lang.set(this.options.lang, Tour.dictionary);
    this.backgroundImage.init();
    this.createScene();
    UI.notification.init();
    UI.popUp.init();
    this.setSliders();
    UI.devCursor.init(this.options.cursor);
    this.setControlPanel();
    this.setMouseMenu();
    this.orientationControls.init();
    this.load(data, function(data) {
        this.setVideos(data.videos);
        this.setImages(data.images);
        document.title = Lang.translate(data.title) || Lang.get('virtual-tour');
        var query = Tour.query.get();
        query.id = query.id || data.start || data.panorams[0].id || 0;
        if (query.id == data.start && !query.lon && !query.lat) {
            var pano = this.getPanorama(query.id);
            query.lat = pano.lat;
            query.lon = pano.lon;
        };
        this.view.set(query, true);
        this.setGallery(data, options.galleryVisible);
        this.addEventListeners();
        Tour.emmit('init');
        this.animate();
    }.bind(this));
};
