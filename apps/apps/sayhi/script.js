var DEBUG = 0;
var ROW_TAP_TIME = 1;
var SPACE_COUNT = 2;
var WAIT_TIME = 2;
var WELCOME_MOVE_UP = 1;

var $RESUME_PANEL = $(".resume-panel");
var $CSS_PANEL = $(".css-code-panel");
var timeline = new TimelineLite();

var loop1 = setInterval(function() {
    resumeToBottom();
}, 100);

var loop2 = setInterval(function() {
    cssToBottom();
}, 100);

if (DEBUG) {
    ROW_TAP_TIME = 0;
    WAIT_TIME = 0;
    WELCOME_MOVE_UP = 0;
}

$(function() {

    init();
    timeline.pause();
    timeline.play();

})

////////////////////////////////////////////////////////////////////////

$CSS_PANEL.showPanel = function() {
    $CSS_PANEL.fadeIn();
}
$CSS_PANEL.hidePanel = function() {
    $CSS_PANEL.fadeOut();
}


////////////////////////////////////////////////////////////////////////

function init() {
    // 开场 - 欢迎语
    writeWelcome();
    wait(WAIT_TIME);
    // 欢迎语置顶
    timeline.to($RESUME_PANEL, WELCOME_MOVE_UP, { padding: '0 10 30' });

    // 写简历
    writeResume(function() {
        // 显示css面板
        timeline.call(function() { $CSS_PANEL.showPanel() });

        //
        writeCommentBlock([
            '这个简历有点丑，这可不是前端攻城狮的性格 :(',
            '下面我来美化一下吧。',
            '首先，加个基础动画设置，动起来别太愣！'
        ]);
        writeSelector('*');
        writePropVal(SPACE_COUNT, 'transition', 'all 1s');
        timeline.call(function() { writeStyle('html, h1, p, img, span { transition: all 1s; -webkit-transition: all 1s; }') });
        writeEnd();

        //
        writeCommentBlock([
            '然后做个基本设置，降低页面色值，让黑白没那么刺眼。'
        ]);
        writeSelector('html');
        writePropVal(SPACE_COUNT, 'background', '#eee');
        timeline.call(function() { writeStyle('html{background: #eee;}') });
        writePropVal(SPACE_COUNT, 'color', '#333');
        timeline.call(function() { writeStyle('html{color: #333;}') });
        writeEnd();

        //
        writeCommentBlock([
            '美一下我的大头贴，',
            '先缩小点，比流行圆的，',
            '恩，居中可能会舒服点。'
        ]);
        writeSelector('.head');
        writePropVal(SPACE_COUNT, 'width', '100px');
        timeline.call(function() { writeStyle('.head{width: 100px;}') });
        writePropVal(SPACE_COUNT, 'height', '100px');
        timeline.call(function() { writeStyle('.head{height: 100px;}') });
        writePropVal(SPACE_COUNT, 'border-radius', '50%');
        timeline.call(function() { writeStyle('.head{border-radius: 50%;}') });
        writePropVal(SPACE_COUNT, 'display', 'block');
        timeline.call(function() { writeStyle('.head{display: block;}') });
        writePropVal(SPACE_COUNT, 'margin', '0 auto');
        timeline.call(function() { writeStyle('.head{margin: 0 auto;}') });
        writeEnd();

        //
        writeCommentBlock([
            '再调下标签文字',
        ]);
        writeSelector('.desc');
        writePropVal(SPACE_COUNT, 'display', 'block');
        timeline.call(function() { writeStyle('.desc{display: block;}') });
        writePropVal(SPACE_COUNT, 'font-size', '12px');
        timeline.call(function() { writeStyle('.desc{font-size: 12px;}') });
        writePropVal(SPACE_COUNT, 'text-align', 'center');
        timeline.call(function() { writeStyle('.desc{text-align: center;}') });
        writePropVal(SPACE_COUNT, 'margin', '15px');
        timeline.call(function() { writeStyle('.desc{margin: 15px;}') });
        writeEnd();

        //
        writeCommentBlock([
            '标题不够突出！调整一下'
        ]);
        writeSelector('h1');
        writePropVal(SPACE_COUNT, 'font-size', '20px');
        timeline.call(function() { writeStyle('h1{font-size: 20px;}') });
        writePropVal(SPACE_COUNT, 'padding-left', '20px');
        timeline.call(function() { writeStyle('h1{padding-left: 20px;}') });
        writePropVal(SPACE_COUNT, 'margin', '30px 0 10px');
        timeline.call(function() { writeStyle('h1{margin: 30px 0 10px;}') });
        writeEnd();

        //
        writeCommentBlock([
            '现在好了，不过还不够美观，',
            '标题前加1个竖线，点缀一下。'
        ]);
        writeSelector('h1::before');
        writePropVal(SPACE_COUNT, 'content', '" "');
        timeline.call(function() { writeStyle('h1::before{content: " "}') });
        writePropVal(SPACE_COUNT, 'width', '3px');
        timeline.call(function() { writeStyle('h1::before{width: 3px}') });
        writePropVal(SPACE_COUNT, 'height', '100%');
        timeline.call(function() { writeStyle('h1::before{height: 100%;}') });
        writePropVal(SPACE_COUNT, 'background', '#555');
        timeline.call(function() { writeStyle('h1::before{background:#555;}') });
        writeEnd();

        //
        writeCommentBlock([
            '正文内容太拥挤了，猜你和我一样不想看下去，',
            '来，继续调整。'
        ]);
        writeSelector('p');
        writePropVal(SPACE_COUNT, 'font-size', '15px');
        timeline.call(function() { writeStyle('p{font-size: 15px;}') });
        writePropVal(SPACE_COUNT, 'line-height', '1.4');
        timeline.call(function() { writeStyle('p{line-height: 1.4;}') });
        writeEnd();

        writeCommentBlock([
            '恩，差不多了，整体看起来顺眼多了。',
            '好吧，继续写简历...',
            '@CSS面板关闭',
            'see u~',
            '.'
        ]);

        wait(WAIT_TIME);

        // 隐藏css面板
        timeline.call(function() { $CSS_PANEL.hidePanel(); });
    });


    timeline.call(function() {
        clearInterval(loop1);
        clearInterval(loop2);
    });


}

////////////////////////////////////////////////////////////////////////

function row() {
    return $('<div>').addClass('row');
}

function comment() {
    return $('<span>').addClass('comment');
}

function selector() {
    return $('<span>').addClass('selector');
}

function prop() {
    return $('<span>').addClass('prop');
}

function val() {
    return $('<span>').addClass('val');
}

function other() {
    return $('<span>').addClass('other');
}


function writeComment(text, tl) {
    if (!tl) tl = timeline;
    var $comment = comment();
    var $row = row();
    tl.call(function() {
        $row.append($comment);
        $CSS_PANEL.append($row);
    });
    tl.to($comment, ROW_TAP_TIME, { text: text })
}

function writeSelector(_selector, tl) {
    if (!tl) tl = timeline;
    var $selector = selector();
    var $row = row();
    var $other = $('<span>').addClass('other');
    tl.call(function() {
        $row.append($selector);
        $row.append($other)
        $CSS_PANEL.append($row)
    });
    tl.to($selector, ROW_TAP_TIME / 2, { text: _selector });
    tl.to($other, ROW_TAP_TIME / 2, { text: ' {' })
}

function writePropVal(space, _prop, _val, tl) {
    if (!space) space = 0;
    if (!tl) tl = timeline;
    var $row = row();
    var $prop = prop();
    var $val = val();
    var $other1 = other();
    var $other2 = other();

    tl.call(function() {
        for (var i = 0; i < space; i++) {
            $row.append('&nbsp;')
        }
        $row.append($prop);
        $row.append($other1)
        $row.append($val);
        $row.append($other2);
        $CSS_PANEL.append($row)
    });
    tl.to($prop, ROW_TAP_TIME / 4, { text: _prop });
    tl.to($other1, ROW_TAP_TIME / 4, { text: ': ' });
    tl.to($val, ROW_TAP_TIME / 4, { text: _val });
    tl.to($other2, ROW_TAP_TIME / 4, { text: ';' });
}

function writeEnd(tl) {
    if (!tl) tl = timeline;
    var $row = row();
    var $other = other();

    tl.call(function() {
        $row.append($other);
        $CSS_PANEL.append($row)
    });

    tl.to($other, ROW_TAP_TIME, { text: '}' });

}

function writeClassBlock(name, kvs /*, callback*/ ) {
    writeSelector(name)
    for (var key in kvs) {
        writePropVal(SPACE_COUNT, key, kvs[key])
    }
    writeEnd()
        // timeline.call(function() {
        //     callback && callback();
        // })
}

function writeCommentBlock(comments) {
    writeComment('/**')
    comments.forEach(function(comment) {
        writeComment('* ' + comment)
    })
    writeComment('*/')
}

function writeWelcome() {
    var words = [
        'Welcome!',
        '感谢公司和看到页面的你，让我能有机会参与到这次首席门徒的竞选。',
        '此时我的心情有点High~只能用代码表达一下。！@_@ 翻个跟头，嘚瑟一下'
    ];

    words.forEach(function(word) {
        writeP(word, '.welcome');
    });

    wait(WAIT_TIME);

    timeline.call(function() {
        if (!DEBUG) $(".welcome-wapper").addClass('high-up');
    });
}


function writeResume(callback) {


    (function() {
        var $head = $('<img>').attr('src', './head.jpg').addClass('head');
        var $row = row();
        $row.append($head);
        // $RESUME_PANEL.append($row);
        timeline.call(function() {
            $RESUME_PANEL.find('.resume').append($row);
        });
    })();

    (function() {
        var $head = $('<span>').addClass('desc');
        var $row = row();
        $row.append($head);
        // $RESUME_PANEL.append($row);
        timeline.call(function() {
            $RESUME_PANEL.find('.resume').append($row);
        });
        timeline.to($head, ROW_TAP_TIME, { text: '有想法 | 会技术 | 善协作' });
    })();

    var p, h, panel = '.resume';

    h = '我';
    p = '董文枭，英文名叫Victor，是一名Codemonkey。' +
        '2010年毕业于黑龙江科技大学计算机科学与技术专业。' +
        '在校期间参加过几次编程比赛，获过一等奖、二等奖。';
    writeH(h, panel);
    writeP(p, panel);


    h = '在猎豹';
    p = '近一年多以来在用户体验部做WEB前端工作，专门给各个产品线卖手腕子：<br>' +
        '早期，导航系列的金山毒霸、金山影视、金山购物等；<br>' +
        '去年，数据类的Libra、智库官网；各种内嵌H5、活动H5...<br>' +
        '近期，有在支持PhotoGrid、Launcher的网页项目。';
    writeH(h, panel);
    writeP(p, panel);

    callback && callback();

    h = '技术贡献';
    p = '半年前发现我们的技术架构有些落后，我决定做一次改变。' +
        '让网页能做到SEO、SPA、按需加载、ES7、实时打包、多语言、React、PWA、CDN 等等，' +
        '这些技术点都能同时实现，并且前端可以做到iOS、Android、H5使用同一套代码逻辑，一键跨平台发布，' +
        '达到全球领先的WEB前端水平。' +
        '国内还没有发现（SEO、SPA、按需加载）同时实现的项目，PhotoGrid网页版可以！';
    writeH(h, panel);
    writeP(p, panel);


    h = '参与活动';
    p = '2015年5月加入猎豹，参加新员工培训，带队“六月豹”获得团队第一。<br>' +
        '2015年11月报名傅盛战队，海选通过（内部透露6500项目，200强）。<br>' +
        '2016年1月参加豹厂“豹动”活动，5人5项挑战连胜，”东北大呲花“获得最佳豹动奖。';
    writeH(h, panel);
    writeP(p, panel);


    h = 'In My Eyes';
    p = 'It has been 2 years since I joined Cheetah Mobile. ' +
        'I followed the company from "复兴国际" to "豹厂" and witnessed a great progress happened ' +
        'in this two years. Such as now we have a wonderful and internationalization workplace, ' +
        'and complete a series of successful cases in commercialization. ' +
        'Like PianoTiled 2 , from 0 to 1, achieve top 10 most popular apps.' +
        'Live.me has been one of mainstream live video platform in the whole world,' +
        'and NewsRepublic also showed an excellent result in global content market. ' +
        'Although we faced a big challenge last year, I believe Mr. Fu will lead us, ' +
        'guide us and with us to a new era, the AI era, and take the predominant ' +
        'position in the new round competition. Cheetah Mobile will definitely become ' +
        'an international top-grade AI/Internet company and provide high quality service for the whole world.';
    writeH(h, panel, true);
    writeP(p, panel, true);

    h = '结语';
    p = '本次介绍程序，策划-开发-上线用了2天时间。<br>' +
        '感谢: <br>胡欣的特效，<br>飞宇的设计，<br>Alex的纠错。';
    writeH(h, panel);
    writeP(p, panel);

    h = '找我';
    p = 'Phone:<br>' +
        '18611081011<br>' +
        'Email:<br>' +
        'dongwenxiao@cmcm.com';
    writeH(h, panel);
    writeP(p, panel);

}

function writeP(text, panelClass) {
    var tl = timeline;

    var $row = row();
    var $p = $('<p>');
    $row.append($p);

    tl.call(function() {
        $RESUME_PANEL.find(panelClass).append($row);
    });

    tl.to($p, ROW_TAP_TIME, { text: text });
}

function writeH(title, panelClass, en) {
    var tl = timeline;

    var $row = row();
    if (en) $row.addClass('en-lang');
    var $h = $('<h1>');
    $row.append($h);

    tl.call(function() {
        $RESUME_PANEL.find(panelClass).append($row);
    });

    tl.to($h, ROW_TAP_TIME, { text: title });
}

function changeLayoutReadyToStart() {
    // timeline.call(function() {
    //     $RESUME_PANEL.removeClass('before-start');
    // }, null, null, '+=1')
    timeline.to($RESUME_PANEL, WELCOME_MOVE_UP, { padding: '0 10' });

    timeline.call(function() {
        $CSS_PANEL.showPanel();
    }, null, null, '+=' + WELCOME_MOVE_UP)

}

function writeStyle(css) {
    var tag = $('<style>').html(css)
    $('head').append(tag)
}

function wait(time) {
    // timeline.duration(time);
    timeline.to($CSS_PANEL, time, { opacity: 1 })
}

function cssToBottom() {
    $(".css-code-panel-wrapper").scrollTop($(".css-code-panel").height())
}

function resumeToBottom() {
    $b = $("body");
    $b.scrollTop($b.height() - window.innerHeight);
}