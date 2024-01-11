async function checkUserLiked(isLogin, likedList, id) {
    if (isLogin) {
        try {
            var response = await axios.get(
                'http://localhost:3000/user/getUserByEmail',
            );
            var user = response.data;
            window.user = user;
            var likeBtn = document.getElementById(`like_${id}`);
            if (likedList.includes(user._id)) {
                likeBtn.classList.toggle('redColor');
                likeBtn.classList.toggle('whiteColor');
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra người dùng đã thích:', error);
        }
    }
}

async function handleLikeBtn(isLogin, id, role) {
    if (!isLogin) {
        $('#login_form').modal('show');
    } else {
        var likeBtn = document.getElementById(`like_${id}`);
        likeBtn.classList.toggle('redColor');
        likeBtn.classList.toggle('whiteColor');
        if (likeBtn.classList.contains('redColor')) {
            try {
                data = await axios.patch(
                    `http://localhost:3000/${role}/addLike?${role}Id=${id}&userId=${user._id}`,
                );
                console.log('Like successful!');
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                data = await axios.patch(
                    `http://localhost:3000/${role}/removeLike?${role}Id=${id}&userId=${user._id}`,
                );
                console.log('Unlike successful!');
            } catch (err) {
                console.log(err);
            }
        }
    }
}

document.addEventListener('click', function (event) {
    // Kiểm tra xem phần tử đã click có class là 'replycommentParent' không
    if (event.target.closest('.replyCommentParent')) {
        var replyCommentParent = event.target.closest('.replyCommentParent');
        var commentId = replyCommentParent.querySelector('.replyCommentInp').id;
        var replyComments = document.querySelectorAll('.replyCommentInp');
        replyComments.forEach((e) => {
            if (e.id != commentId) e.innerHTML = '';
        });
    }
});

async function submitComment(isLogin, formId) {
    event.preventDefault();
    if (!isLogin) {
        $('#login_form').modal('show');
    } else {
        var form = $(`#${formId}`)[0];
        var formData = new FormData(form);
        formData.append('userId', user._id);
        await axios.post('http://localhost:3000/comment/', formData);
        $('#commentInp')[0].value = '';
        if (formId == 'commentForm') renderComments(`${blogId}`);
        else renderReplyComments(form.parentId.value);
    }
}

async function renderReplyComments(parentId, isLogin) {
    try {
        var data = await axios.get(
            `http://localhost:3000/comment/getReplyComments?parentId=${parentId}`,
        );
        var comments = data.data;
        var promises = comments.map(async (comment) => {
            var ownerComment = await axios.get(
                `http://localhost:3000/user/getById?id=${comment.userId}`,
            );
            var ownerName =
                ownerComment.data.name == 'CastError'
                    ? 'Người dùng HappyMinds'
                    : user.data.name;
            var id = comment._id;
            var likedList = comment.likedList;
            var bgColor = '';
            var color = '';
            if (likedList.includes(ownerComment.data._id) && isLogin) {
                bgColor = 'redColor';
                color = 'whiteColor';
            }
            return `
                <div class="d-flex justify-content-start card mt-4 col-11 pb-1 mb-4">
                    <div class="card-body">
                        <div class="row justify-content-start">
                            <div class="col-auto">
                                <img class="rounded-circle"
                                    src="https://i.pinimg.com/236x/38/a5/1f/38a51fbad2946fd87525c807d2a078e4.jpg"
                                    alt="Profile Picture" style="width: 30px; height: 30px;">
                            </div>
                            <div class="col p-0">
                                <h6 class="mb-0 p-0" id="name">${ownerName}</h6>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-10 pe-2">
                                <div>${comment.content}</div>
                                <div id="img${comment._id}">
                                    <img class="col-lg-12m col-12 mb-lg-12 rounded-2" src="${comment.imgUrl}" style="width: 200px">
                                </div>
                            </div>
                            <div class="col d-flex align-items-center justify-content-between"> 
                                <div class="row justify-content-between">
                                    <label class="px-4 col btn btn-outline-danger ${bgColor} ${color}" id="like_${comment._id}" onclick="handleLikeBtn(${isLogin}, '${id}', 'comment')">
                                        <i class="bi bi-heart"></i>
                                    </label>
                                    <button class="px-4 ms-2 col btn btn-primary" onclick=showReplyCommentInp("${comment.parentId}")>
                                        <i class="bi bi-arrow-return-left"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;
        });
        var contents = await Promise.all(promises);
        var content = contents.join('');
        $(`#replyCommentList${parentId}`)[0].innerHTML = content;
        $(`#replyCommentList${parentId}`)[0].innerHTML += `
            <div class="col-12 replyCommentInp" id="${parentId}" ></div>`;
    } catch (err) {
        console.error(err);
    }
}

async function renderComments(blogId, isLogin) {
    try {
        var data = await axios.get(
            `http://localhost:3000/comment/getBlogComments?blogId=${blogId}`,
        );
        var comments = data.data;
        var promises = comments.map(async (comment) => {
            var ownerComment = await axios.get(
                `http://localhost:3000/user/getById?id=${comment.userId}`,
            );
            var ownerName =
                ownerComment.data.name == 'CastError'
                    ? 'Người dùng HappyMinds'
                    : ownerComment.data.name;
            var responseText = comment.responseTimes
                ? `Hiển thị thêm ${comment.responseTimes} lượt phản hồi`
                : '';
            var commentId = comment._id;
            var likedList = comment.likedList;
            var bgColor = '';
            var color = '';
            if (isLogin && likedList.includes(user?._id)) {
                bgColor = 'redColor';
                color = 'whiteColor';
            }
            return `
            <div class="card mt-4 col-9 pb-1 mb-4 replyCommentParent" style="position: relative;">
                <div class="card-body ">
                    <div class="row justify-content-start">
                        <div class="col-auto">
                            <img class="rounded-circle"
                                src="https://i.pinimg.com/236x/38/a5/1f/38a51fbad2946fd87525c807d2a078e4.jpg"
                                alt="Profile Picture" style="width: 30px; height: 30px;">
                        </div>
                        <div class="col p-0">
                            <h6 class="mb-0 p-0" id="name">${ownerName}</h6>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-10 pe-2">
                            <div>${comment.content}</div>
                            <div id="img${commentId}">
                                <img class="col-lg-12m col-12 mb-lg-12 rounded-2 " src="${comment.imgUrl}" style="width: 200px">
                            </div>
                        </div>
                        <div class="col d-flex align-items-center justify-content-between"> 
                            <div class="row justify-content-between">
                                <label class="px-4 col btn btn-outline-danger ${bgColor} ${color}" id="like_${commentId}" onclick="handleLikeBtn(${isLogin}, '${commentId}', 'comment')">
                                    <i class="bi bi-heart"></i>
                                </label>
                                <button class="px-4 ms-2 col btn btn-primary" onclick=showReplyCommentInp("${commentId}")>
                                    <i class="bi bi-arrow-return-left"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="position:relative;left:40px;" id="replyCommentList${commentId}">
                    <b onmouseover="this.style.cursor='pointer'" onmouseout="this.style.cursor='default'" onclick="renderReplyComments('${commentId}', ${isLogin})">${responseText}</b>
                    <div class="col-12 replyCommentInp" id="${commentId}" ></div>
                </div>
            </div>
        `;
        });
        var contents = await Promise.all(promises);
        var content = contents.join('');
        $('#commentList')[0].innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

function showReplyCommentInp(commentId) {
    console.log(commentId);
    document.getElementById(commentId).innerHTML = `
        <div class="d-flex justify-content-start card mt-4 col-11 pb-1 mb-4">
            <div class="card-body ">
                <div class="row justify-content-start">
                    <div class="col-auto">
                        <img class="rounded-circle"
                            src="https://i.pinimg.com/236x/38/a5/1f/38a51fbad2946fd87525c807d2a078e4.jpg"
                            alt="Profile Picture" style="width: 30px; height: 30px;">
                    </div>
                    <div class="col p-0">
                        <h6 class="mb-0 p-0" id="name">You</h6>
                    </div>
                    <div class="col-auto pe-2" onclick=cancelComment("replyCommentInp")>
                        <button class="btn btn-outline-danger">
                            <i class="bi bi-x-circle-fill"></i>
                        </button>
                    </div>
                </div>
                <form id="replyCommentForm" class="row mt-3">
                    <div class="col-10 pe-2">
                        <input type="text" class="form-control" name="content" id="replyCommentInp"
                            placeholder="Type your review comment . . .">
                        <input type="hidden" id="hiddenInput" name="parentId" value="${commentId}">
                    </div>
                    <label class="col btn btn-outline-secondary pe-2">
                        <i class="bi bi-upload"></i>
                        <input type="file" class="custom-file-input" name="upload" id="fileInput"
                            style="display: none;">
                    </label>
                    <button class="col btn btn-primary ms-2 me-2" onclick=submitComment({{isLogin}},"replyCommentForm")> 
                        <i class="bi bi-send"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
    $('#replyCommentInp')[0].focus();
}

setTimeout(function () {
    var link = window.location.href;
    document.getElementById('linkPost').value = link; // Set value of 'linkPost' to the current URL
}, 200);

function sharePost() {
    document.getElementById('linkPost').value = 'Coppied!'; // Set value of 'linkPost' to the current URL
    var linkToCopy = window.location.href; // Link to share with the user
    var textarea = document.createElement('textarea');
    textarea.value = linkToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        navigator.clipboard.writeText(textarea.value);
    } catch (err) {
        console.error('Unable to copy', err);
    }
    document.body.removeChild(textarea);
}

function cancelComment(id) {
    document.getElementById(`${id}`).value = '';
}
