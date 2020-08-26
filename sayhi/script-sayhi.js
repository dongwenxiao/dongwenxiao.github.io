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
            '好吧，继续写...',
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
        'Hi，前沿社的同学们，大家好！',
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
        var $head = $('<img>').attr('src', './head2020.png').addClass('head').css({ maxWidth: '100px'});
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

    h = '我 💁';
    p = '董文枭，是一名Codemonkey。' +
        '2010年毕业于黑龙江科技大学计算机科学与技术专业。' +
        '互联网从业10年，做过教育、广告、游戏、工具领域的项目。' +
        '产品点子多，想到就能做到。目前在搞一款协同办公产品，叫“轻计划”，已上架飞书应用市场。';
    writeH(h, panel);
    writeP(p, panel);

    h = '2015年加入猎豹 🏢';
    p = '目前任职技术总监，负责技术平台部，向全公司输出前端技术支持。<br>' +
        '专业职级T8，技术职级委员；<br>' +
        '申请了 4 项技术专利。<br>' ;
    writeH(h, panel);
    writeP(p, panel);

    callback && callback();

    h = '轻计划 📆';
    p = '搞了大半年，乘着飞书的船，借着疫情的风，白嫖了一波流量。' +
        '用户还在涨，应用继续升级 ...' ;
    writeH(h, panel);
    writeP(p, panel);

    h = '感谢 💜';
    p = '志同道合的合伙人：小龙 <br>' +
        '推荐人：卓群<br>' +
        '前沿社的工作人员和同学们';
    writeH(h, panel);
    writeP(p, panel);


    // h = 'In My Eyes';
    // p = 'It has been 2 years since I joined Cheetah Mobile. ' +
    //     'I followed the company from "复兴国际" to "豹厂" and witnessed a great progress happened ' +
    //     'in this two years. Such as now we have a wonderful and internationalization workplace, ' +
    //     'and complete a series of successful cases in commercialization. ' +
    //     'Like PianoTiled 2 , from 0 to 1, achieve top 10 most popular apps.' +
    //     'Live.me has been one of mainstream live video platform in the whole world,' +
    //     'and NewsRepublic also showed an excellent result in global content market. ' +
    //     'Although we faced a big challenge last year, I believe Mr. Fu will lead us, ' +
    //     'guide us and with us to a new era, the AI era, and take the predominant ' +
    //     'position in the new round competition. Cheetah Mobile will definitely become ' +
    //     'an international top-grade AI/Internet company and provide high quality service for the whole world.';
    // writeH(h, panel, true);
    // writeP(p, panel, true);

    // h = '结语';
    // p = '本次介绍程序，策划-开发-上线用了2天时间。<br>' +
    //     '感谢: <br>胡欣的特效，<br>飞宇的设计，<br>Alex的纠错。';
    // writeH(h, panel);
    // writeP(p, panel);

    h = '联系我';
    p = 'Phone / Wechat:<br>' +
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