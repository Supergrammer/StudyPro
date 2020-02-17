const HOME  = "/";

// User
const USERS  = "/users";

const USER_DETAIL = "/:user_id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const SOCIAL_SIGNIN = "/social/signin";
const CHECK_TOKEN = "/token";
const UPDATE_PASSWORD = "/pass"

// Images
const IMAGES = "/images"

// Study
const STUDIES = "/studies";
const STUDY = "/create";
const STUDY_SEARCH = "/search";
const STUDY_MARK = "/mark";
const STUDY_DETAIL = "/detail";


//Post
const POSTS = "/posts"
const POST_LIST = "/list";
const POST_DETAIL = "/detail";
const POST_SEARCH = "/search";
const POST_NUMBER = "/number"
const POST_LIKE = "/like";

// Comments
const COMMENTS = "/comments";
const COMMENT = "/comment";
const COMMENT_like = "/comment_like";

// Works
const WORKS = "/works";
const WORK = "/create";
const WORK_DETAIL = "/detail";

// Applies
const APPLIES = "/applies";
const APPLY = "/create";
const APPLY_DETAIL = "/detail";

// Alarms
const ALARMS = "/alarms";
const ALARM = "/create";
const ALARM_DETAIL = "/detail";


//email
const EMAIL = "/email"
const AUTH = "/auth"
const NOTICE_APPLY = "/notice_apply"
const RESULT_APPLY = "/result_apply"

const routes = {
    home : HOME,

    users : USERS,
    userDetail : USER_DETAIL,
    changePassword : CHANGE_PASSWARD,
    signup : SIGNUP,
    signin : SIGNIN,
    social_signin : SOCIAL_SIGNIN,
    check_token: CHECK_TOKEN,
    update_password: UPDATE_PASSWORD,

    images : IMAGES,
    
    studies : STUDIES,
    study : STUDY,
    study_detail : STUDY_DETAIL,
    study_search : STUDY_SEARCH,
    study_mark : STUDY_MARK,

    posts : POSTS,
    post_number: POST_NUMBER,
    post_list : POST_LIST,
    post_detail : POST_DETAIL,
    post_search : POST_SEARCH,
    post_like: POST_LIKE,

    comments : COMMENTS,
    comment : COMMENT,
    comment_like: COMMENT_like,

    works : WORKS,
    work : WORK,
    work_detail : WORK_DETAIL,
    
    applies : APPLIES,
    apply : APPLY,
    apply_detail : APPLY_DETAIL,

    alarms : ALARMS,
    alarm : ALARM,
    alarm_detail : ALARM_DETAIL,

    email:EMAIL,
    auth:AUTH,
    notice_apply : NOTICE_APPLY,
    result_apply : RESULT_APPLY,

}
export default routes;