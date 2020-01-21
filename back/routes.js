// User
const USERS  = "/users";
const USER_DETAIL = "/:user_id";
const CHANGE_PASSWARD = "/change-password";
const SIGNUP = "/signup";
const SIGNIN = "/signin";

// Study
const STUDIES = "/studies";
const STUDY = "/create";
const STUDY_SEARCH = "/search";
const STUDY_MARK = "/mark";
const STUDY_DETAIL = "/detail";


//Post
const POST = "/create"
const POSTS = "/list";
const POST_DETAIL = "/detail";

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

const routes = {
    users : USERS,
    userDetail : USER_DETAIL,
    changePassword : CHANGE_PASSWARD,
    signup : SIGNUP,
    signin : SIGNIN,

    studies : STUDIES,
    study : STUDY,
    study_detail : STUDY_DETAIL,
    study_search : STUDY_SEARCH,
    study_mark : STUDY_MARK,

    post : POST,
    posts : POSTS,
    post_detail : POST_DETAIL,

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

}

export default routes;