/**
 * Created by mapbar_front on 2018/3/27.
 */
const isDev = true;

const navConfig = [
    {type:'file-word', title:'免费课程', path:'/freecourse'},
    {type:'file-excel', title:'职业发展', path:'/macareer'},
    {type:'file-ppt', title:'项目实战', path:'/project'},
    {type:'user', title:'猫友论坛', path:'/detail'},
];

const careerListConfig = [
    {icon: 'ie',work:'Web前端攻城狮',detail:'互联网时代最火热的技术'},
    {icon: 'user',work:'Java攻城狮',detail:'综合就业排名第一'},
    {icon: 'android',work:'Android攻城狮',detail:'移动设备市场份额第一'},
    {icon: 'user',work:'PHP攻城狮',detail:'可能是世界上最好的语言'},
    {icon: 'apple',work:'IOS攻城狮',detail:'可能是全球最好用的系统'}
];

const LinkConfig = [
    '关于我们',
    '团队介绍',
    '企业合作',
    '人才招聘',
    '讲师招募',
    '友情链接'
];

const directionConfig = [
    '全部',
    '前端开发',
    '后端开发',
    '移动开发',
    '数据库',
    '人工智能',
    '人工智能&大数据',
    '运维&测试',
    'UI设计'
];
const typeConfig = [
    '全部',
    '基础',
    '案例',
    '框架',
    '工具',
    '设计模式'
];

const classifyConfig = [
    '全部',
    'HTML/CSS',
    'JavaScript',
    'Html5',
    'CSS3',
    'jQuery',
    'Node.js',
    'BootStrap',
    'Angular',
    'React.js',
    'Vue.js',
    'Sass/Less',
    'PHP',
    'Python',
    'C',
    'C++'
];

const baseUrl = isDev ? 'http://172.21.61.55':'http://74a8f306.ngrok.io';


export default {
    baseUrl,
    navConfig,
    careerListConfig,
    LinkConfig,
    directionConfig,
    classifyConfig,
    typeConfig
}
