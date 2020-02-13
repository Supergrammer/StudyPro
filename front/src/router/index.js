import Vue from 'vue'
import VueRouter from 'vue-router'

// 공통페이지
import appHeader from '@/components/common/Header'
import appFooter from '@/components/common/Footer'

// 인트로, 홈페이지
import intro from '@/views/Intro'
import home from '@/views/Home'

// 게시판
import board from '@/components/board/board'
import postContent from '@/components/board/post_content'
import postRegister from '@/components/board/post_register'
import postModify from '@/components/board/post_modify'

// 유저페이지
import user from '@/views/User'
import signup from '@/components/user/Signup'
import signupSuccess from '@/components/user/SignupSuccess'
import mypage from '@/components/user/Mypage'

// 스터디페이지
import study from '@/views/Study'
import search from '@/components/study/StudyMain'
import studydetail from '@/components/studydetail/MainStudyDetail'
import workspace from '@/components/workspace/WorkSpace'

//쪽지함 접근(임시)
import msgbox from '@/components/user/messenger/MessageHome'

// 일정관리 페이지
import calendar from '@/views/Calendar'
import mycal from '@/components/calendar/MyCalendar'

// test
import studyView from '@/components/ViewTest/studyView'
import studyHome from '@/components/ViewTest/studyHome'
import studyCalendar from '@/components/ViewTest/studyCalendar'
import studyBoard from '@/components/ViewTest/board_study/board'
import studyRegister from '@/components/ViewTest/board_study/post_register'
import studyModify from '@/components/ViewTest/board_study/post_modify'
import boardContents from '@/components/ViewTest/board_study/post_content'

Vue.use(VueRouter)

const routes = [{
    path: '/test/:study_id',
    name: 'study_main',
    components: {
        header: appHeader,
        default: studyView,
        footer: appFooter,
    },
    props: true,
    children: [{
        path: 'home',
        name: 'study_home',
        component: studyHome,
    },
    {
        path: 'calendar',
        name: 'study_calendar',
        component: studyCalendar,
    },
    {
        path: 'board/register',
        name: 'study_register',
        component: studyRegister,
        props: true,
    },
    {
        path: 'board/modify',
        name: 'study_modify',
        component: studyModify,
        props: true,
    },
    {
        path: 'board/:board_name',
        name: 'study_board',
        component: studyBoard,
        props: true,
        children: [{
            path: '?post_id=:post_id',
            name: 'board_contents',
            component: boardContents,
            props: true,
        }]
    }]
},
{
    path: '/',
    name: 'intro',
    components: {
        header: null,
        default: intro,
        footer: null
    }
},

{
    path: '/home',
    name: 'home',
    components: {
        header: appHeader,
        default: home,
        footer: appFooter,
    }
},
{
    path: '/study',
    name: 'study',
    components: {
        header: appHeader,
        default: study,
        footer: appFooter
    },
    children: [{
        path: 'search',
        name: 'search',
        component: search,
    },
    {
        path: ':id',
        name: 'studydetail',
        component: studydetail,
    },
    ]
},
{
    path: '/workspace/:id',
    name: 'workspace',
    components: {
        header: null,
        default: workspace,
        footer: null
    }
},
{
    path: '/board/register',
    name: 'post_register',
    components: {
        header: appHeader,
        default: postRegister,
        footer: appFooter
    },
},
{
    path: '/board/modify',
    name: 'post_modify',
    components: {
        header: appHeader,
        default: postModify,
        footer: appFooter
    },
    props: true,
},
{
    path: '/board/:board',
    name: 'board',
    components: {
        header: appHeader,
        default: board,
        footer: appFooter,
    },
    props: true,
    children: [{
        path: '?id=:post_id',
        name: 'post_id',
        component: postContent,
        props: true,
    }]
},
{
    path: '/user',
    name: 'user',
    components: {
        header: appHeader,
        default: user,
        footer: appFooter
    },
    children: [{
        path: 'mypage',
        component: mypage
    },
    {
        path: 'signup',
        name: 'signup',
        component: signup
    },
    {
        path: 'signup/success',
        component: signupSuccess
    },
    ]
},
{
    path: '/msgbox',
    name: 'msgbox',
    components: {
        header: appHeader,
        default: msgbox,
        footer: appFooter
    }
},

{
    path: '/calendar',
    name: 'calendar',
    components: {
        header: appHeader,
        default: calendar,
        footer: appFooter
    },
    children: [{
        path: 'mycal',
        name: 'mycal',
        component: mycal,
    }]
}]

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: "active",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})

export default router