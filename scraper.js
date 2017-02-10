var request = require('request'),
    cheerio = require('cheerio');

var url = 'https://playoverwatch.com/en-us/career/pc/us/Fio-11453';

var stats = {};

request(url, function(err, res, data) {
    if (err) throw err;
    $ = cheerio.load(data);

    var compRank = $('.competitive-rank').find('div').first().text();
    var compHeroStats = $('#competitive [data-category-id="overwatch.guid.0x08600000000003D1"]').find('.progress-category-item');
    var qpHeroStats = $('#quickplay [data-category-id="overwatch.guid.0x0860000000000021"]').find('.progress-category-item');

    // competitive includes win percentage for each hero
    var compTopHeroes = [];

    // quick play only includes hours played
    var qpTopHeroes = [];

    compHeroStats.each(function(){
        let hero = $(this).find('.title').text();
        let wr = $(this).find('.description').text();
        let stats = {};
        stats[hero] = wr;
        compTopHeroes.push(stats);
    });

    qpHeroStats.each(function(){
        let hero = $(this).find('.title').text();
        let tp = $(this).find('.description').text();
        let stats = {};
        stats[hero] = tp;
        qpTopHeroes.push(stats);
    });
});