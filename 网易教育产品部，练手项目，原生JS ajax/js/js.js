/**
 * Created by Administrator on 2016/6/13.
 */
function picMove() {
    var oPicBox = document.getElementById('main3pics');
    var pics = oPicBox.getElementsByTagName('img');
    var distance = -(pics[0].offsetWidth + utils.css(pics[0], 'margin-right')) * pics.length / 2;
    var curLeft=0
    function move() {
        curLeft -= 1;
        if (curLeft <= distance) {
            curLeft = 0
        }
        oPicBox.style.left = curLeft + 'px';
    }
    var timer=setInterval(move,10);
    oPicBox.onmouseover=function(){
        clearInterval(timer);
    }
    oPicBox.onmouseout=function(){
        timer=setInterval(move,10);
    }
}
picMove();

function autoBanners(id) {

//picMove();

    var oMain1 = document.getElementById(id);
    var oImgs = oMain1.getElementsByTagName('img');
    var oAs = oMain1.getElementsByTagName('a');
    var oUl = oMain1.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var step = 0;
    var flag = true;
    var bannerTimer = setInterval(autoBanner, 2000);

    function autoBanner() {
        if (step >= oAs.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < oAs.length; i++) {
            var cur = oAs[i];
            if (i == step) {
                utils.css(cur, 'zIndex', 1);
                xiaomiAnimate(cur, {'opacity': 1}, 500, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'opacity', 0);
                    }
                    flag = false;
                });
                continue;
            }
            utils.css(oAs[i], 'zIndex', 0);

        }
        bannerTip();
    }


    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            var curLi = aLi[i];
            i === step ? utils.addClass(curLi, 'bg') : utils.removeClass(curLi, 'bg');
        }
    }

    stopStart();
    function stopStart() {
        oMain1.onmouseover = function () {
            clearInterval(bannerTimer);
        };
        oMain1.onmouseout = function () {
            bannerTimer = setInterval(autoBanner, 2000);

        };
    }

    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            var curLi = aLi[i];
            curLi.index = i;
            curLi.onclick = function () {
                if (flag == false) {
                    step = this.index;
                    setBanner();
                }
                flag = true;
            }
        }
    }
}
autoBanners('main1');
/**
 * ajax;
 */
function ajaxGo(){
    ajax({
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        method: 'get',
        data: {
            'pageNo': '1',
            'psize': '20',
            'type': '10'
        },
        success:function(data){
            var aData='JSON' in window?JSON.parse(data):eval('('+data+')'),
                curData1=aData.list;
            oDiv = document.getElementById("main4show");
            for(var i=0;i<curData1.length;i++){
                var str='';
                var curData=curData1[i];
                if(curData["price"]==0){
                    curData["price"]='free';
                }else{
                    curData["price"] = '￥' + curData["price"];
                }
                if(!curData["categoryName"]){
                    curData["categoryName"]='无';
                }
                str += '<div class="main4showcontent">';
                str += '<img src=' + curData["middlePhotoUrl"] + ' alt="">';
                str += '<p class="pstyle">' + curData["name"] + '</p>';
                str += '<div>  ' + curData["provider"] + '</div>';
                str += '<span>' + curData["learnerCount"] + '</span>';
                str += '<strong>' + curData["price"] + '</strong>';
                str += '<a>';
                str += '<img src=' + curData["middlePhotoUrl"] + ' alt="">';
                str += '<h3 class="aa">'  + curData["name"] + '</h3>';
                str += '<span>' + curData["learnerCount"] + '人在学</span>';
                str += '<p class="categoryname"> 发布者：' + curData["provider"] + '<br>'+'分类: '+curData["categoryName"]+'</p>';
                str += '<p class="description">' + curData["description"] + '</p>';
                str += '</a>';
                str += '</div>';
                oDiv.innerHTML += str;
            }
        },
        async : true
    });
    ajax({
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        method: 'get',
        data: {
            'pageNo': '1',
            'psize': '20',
            'type': '20'
        },
        success:function(data){
            var aData= 'JSON' in window?JSON.parse(data):eval('('+data+')'),
                curData1=aData.list;
            oDiv = document.getElementById("main4hidden");
            for(var i=0;i<curData1.length;i++){
                var str='';
                var curData=curData1[i];
                if(curData["price"]==0){
                    curData["price"]='free';
                }
                if(!curData["categoryName"]){
                    curData["categoryName"]='无';
                }
                str += '<div class="main4showcontent">';
                str += '<img src=' + curData["middlePhotoUrl"] + ' alt="">';
                str += '<p class="pstyle">' + curData["name"] + '</p>';
                str += '<div>  ' + curData["provider"] + '</div>';
                str += '<span>' + curData["learnerCount"] + '</span>';
                str += '<strong>' + curData["price"] + '</strong>';
                str += '<a>';
                str += '<img src=' + curData["middlePhotoUrl"] + ' alt="">';
                str += '<h3 class="aa">'  + curData["name"] + '</h3>';
                str += '<span>' + curData["learnerCount"] + '人在学</span>';
                str += '<p class="categoryname"> 发布者：' + curData["provider"] + '<br>'+'分类: '+curData["categoryName"]+'</p>';
                str += '<p class="description">' + curData["description"] + '</p>';
                str += '</a>';
                str += '</div>';
                oDiv.innerHTML += str;
            }


        },
        async : true
    });

    ajax({
        url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
        method: 'get',
        success:function(data){
            var aData= 'JSON' in window?JSON.parse(data):eval('('+data+')'),
            oDiv = document.getElementById("verti");
            for(var i=0;i<aData.length;i++){
                var str='';
                var curData=aData[i];
                if(curData["price"]==0){
                    curData["price"]='free';
                }else{
                    curData["price"] = '￥' + curData["price"];
                }
                if(!curData["categoryName"]){
                    curData["categoryName"]='无';
                }
                str += '<a id="verticalBanner">';
                str += '<div>';
                str += '<img src=' + curData["smallPhotoUrl"] + ' alt="">';
                str += '</div>';
                str += '<p>'  + curData["name"] + '</p>';
                str += '<span>' + curData["learnerCount"] + '人在学</span>';
                str += '</a>';
                oDiv.innerHTML += str;
            }
        },
        async : true
    });
}
ajaxGo();
/**
 * 选项卡
 * @param id
 */
function Tab(){
    var oDiv=document.getElementById('main4lhead'),
        oBtns=utils.getByClass(oDiv,'productbtn'),
        aDiv=document.getElementById('main4lbody'),
        aDivs=utils.getByClass(aDiv,'main4l');
    var that=this;
    for(var i= 0;i<oBtns.length;i++){
        var cur=oBtns[i];
        cur.index=i;
        cur.onclick=function(){
            changeTab(this.index)

        }

    }
    function changeTab(n){
        for (var i = 0; i <oBtns.length; i++) {
            oBtns[i].className = 'productbtn';
            aDivs[i].style.display = 'none';
        }
        oBtns[n].className = 'productbtn selected';
        aDivs[n].style.display = 'block';

    }

}
Tab();

function playvideo(){  //弹出视频层
    var oList = document.getElementById('videotitle'),
        oTrigger=document.getElementById('trigger'),
        oPopupvideo=document.getElementById('popupvideo'),
        oClose = document.getElementById('close'),
        myVideo = oList.getElementsByTagName('video')[0];
    oTrigger.onclick = function(){
        oPopupvideo.style.display = 'block';
    };
    oClose.onclick = function(){
        oPopupvideo.style.display = 'none';
       // myVideo.pause();
    };
}
playvideo();
//垂直滚动轮播


function verticalBanner(){
    var oBox=document.getElementById('verti');
    var cur=utils.getCss(oBox,'top');
    if(cur<='-700'){
        cur=0;
    }
    cur=cur-70;
    xiaomiAnimate(oBox,{'top':cur},500);
}
setInterval(verticalBanner,2000)