const socket = io()
$(document).ready(() => {
    $('#side-tweet').click((e) => {
        e.preventDefault()
        var data = {}
        $('#modalCreateUpload').serializeArray().forEach((element) => {
            if (element.value) {
                data[element.name] = element.value;
            }
        });
        var img = $('#side-tweet-file');
        data.fileUpload = img[0].files[0]
        var reqObj = new FormData();
        reqObj.append('name', data.name);
        reqObj.append('description', data.description);
        reqObj.append('fileUpload', data.fileUpload);
        $.ajax({
            type: 'POST',
            url: '/manager/chatRoom/uploadDocument',
            data: reqObj,
            processData: false,
            contentType: false,
            success: function(data) {
                socket.emit('Uploaded', data)
                alert('Post Shared Succesfully')
            },
            error: function(e) {
                alert('somthing went wrong while uploding document')
            }
        })
    })
})


socket.on("sending data", (data) => {
    $.ajax({
        type: 'GET',
        url: '/manager/loadHome',
        success: function(data) {
            $('.append-info').remove()
            $("#toAppend").empty()
            data.forEach(element => {

                if (element.developerId) {
                    let userId =
                      element.developerId._id?.toString() + "/" + element?._id + "0";
                    $("#toAppend").prepend(`
                      <div class="postWrapper">
                                          <div class="postTop">
                                              <div class="postTopLeft">
                                                  <div class="postChatUsername">
                                                      <span class="postChatroom">
                                                      ${element?.name}
                                                      </span>
                                                      <span class="postUsername">
                                                          ${element?.developerId?.name}
                                                      </span>
                                                  </div>
                                                  <span class="postDate">${new Date(
                                                    element.createdAt
                                                  ).toLocaleDateString()}</span>
                                              </div>
                                            
                                          </div>
                                          <div class="postCenter">
                                              <img class="postImg" src="http://localhost:3000/images/${
                                                element?.fileUpload?.filename
                                              }" alt="" />
                                              <span class="postText"> ${
                                                element?.description
                                              } </span>
                                          </div>
                                           <div class="postBottom">
                                              <div class="postBottomLeft">
          
                                              <button class="invoke-like" data-userId="${
                                                element.developerId._id
                                              }" data-postId="${
                      element?._id
                    }" data-isManager="0" 
                                              onclick="likePost(event)" >
                                              <img
                                              data-userId="${
                                                element.developerId._id
                                              }" data-postId="${
                      element?._id
                    }" data-isManager="0" 
                                              class="likeIcon"
                                              src="http://localhost:3000/img/${
                                                element.likedBy.indexOf(
                                                  element.developerId._id
                                                ) >= 0
                                                  ? "heart.png "
                                                  : "heartless.png"
                                              } "
                                              alt=""
                                              />
                                          </button>
                                              <span class="postLikeCounter">${
                                                element.likeCount
                                              }  people like this</span>
                                              </div>
                                              <div class="postBottomRight" data-toggle="modal" data-target="#commentModal">
                                              <span class="postCommentText" data-userId="${
                                                element.developerId._id
                                              }" data-postId="${element?._id}" 
                    data-isManager="0" 
                    data-username=${element.developerId.name}>
                                              Comments</span>
                                              </div>
                                              <div
                                                class="modal fade"
                                                id="commentModal"
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="commentModalLabel"
                                                aria-hidden="true"
                                        >
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">Add Comment</h5>
                              <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onclick= "clearInput()"
                              >
                              <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modalComment">
                              <form id="modalCommentForm" name="modalCommentForm" enctype="multipart/form-data">
                                  <div class="modalCommentInput form-group">
                                      <input  type="text" id="comment-content" name="comment" class="form-control" id="commentModalTextArea" rows="1" placeholder="Comment here" required='true'></input>
                                  </div>
                                  <button id="comment-post1" form="modalCommentPost" type="submit" class="commentPostButton " data-userId="${
                                    element.developerId._id
                                  }" data-postId="${
                      element?._id
                    }" data-isManager="0" aria-hidden="true">Post Comment</button>
                              </form>
                          </div>
                          <hr class="commentHr">
                          <div class="modalAllComments">
                              <div class="modalCommentWrapper">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
                                          </div>`);
                  } else {
                    $("#toAppend").prepend(`
                     <div class="postWrapper">
                                          <div class="postTop">
                                              <div class="postTopLeft">
                                                  <div class="postChatUsername">
                                                      <span class="postChatroom">
                                                      ${element?.name}
                                                      </span>
                                                      <span class="postUsername">
                                                          ${element?.managerId.name}
                                                      </span>
                                                  </div>
                                                  <span class="postDate">${new Date(
                                                    element.createdAt
                                                  ).toLocaleDateString()}</span>
                                              </div>
                                            
                                          </div>
                                          <div class="postCenter">
                                              <img class="postImg" src="http://localhost:3000/images/${
                                                element?.fileUpload?.filename
                                              }" alt="" />
                                              <span class="postText"> ${
                                                element?.description
                                              }  </span>
                                          </div>
                                           <div class="postBottom">
                                              <div class="postBottomLeft">
          
                                              <button class="invoke-like" data-userId="${
                                                element.managerId._id
                                              }" data-postId="${
                      element?._id
                    }" data-isManager="1" onclick="likePost(event)">
                                              <img
                                              data-userId="${
                                                element.managerId._id
                                              }" data-postId="${
                      element?._id
                    }" data-isManager="1"
                                              class="likeIcon"
                                              src="http://localhost:3000/img/${
                                                element.likedBy.indexOf(
                                                  element.managerId._id
                                                ) >= 0
                                                  ? "heart.png "
                                                  : "heartless.png"
                                              } "
                                              alt=""
                                  
                                              />
                                          </button>
                                              <span class="postLikeCounter">${
                                                element.likeCount
                                              }  people like this</span>
                                              </div>
                                              <div class="postBottomRight" data-toggle="modal" data-target="#commentModal">
                                              <span class="postCommentText" data-userId="${
                                                element.managerId._id
                                              }" data-postId="${
                      element?._id
                    }" data-isManager="1" 
                    data-username=${element.managerId.name}>
                                              Comments</span>
                                              </div>
                                              <div
                                                class="modal fade"
                                                id="commentModal"
                                                tabindex="-1"
                                                role="dialog"
                                                aria-labelledby="commentModalLabel"
                                                aria-hidden="true"
                                        >
                  <div class="modal-dialog" role="document">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">Add Comment</h5>
                              <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onclick= "clearInput()"
                              >
                              <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modalComment">
                              <form id="modalCommentForm" name="modalCommentForm" enctype="multipart/form-data">
                                  <div class="modalCommentInput form-group">
                                      <input  type="text" id="comment-content" name="comment" class="form-control" id="commentModalTextArea" rows="1" placeholder="Comment here" required='true'></input>
                                  </div>
                                  <button id="comment-post1" form="modalCommentPost" type="submit" class="commentPostButton " data-userId="${
                                    element.managerId._id
                                  }" data-postId="${
                      element?._id
                    }" data-isManager="1"  aria-hidden="true">Post Comment</button>
                              </form>
                          </div>
                          <hr class="commentHr">
                          <div class="modalAllComments">
                
                          </div>
                      </div>
                  </div>
              </div>
                                          </div>`);
                  }
            });
        },
        error: function() {
            alert('Error while loading profile')
        }
    })
})