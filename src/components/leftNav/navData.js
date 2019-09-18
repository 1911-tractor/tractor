let obj={
    data: [
        {
          name:'首页',
          key:'0',
          path:'/admin'
        },
        {
            name:'图书管理',
            key:'1',
            path:'/admin/books',
            children:[
                {
                    name:'新增图书',
                    path:'/admin/books/add',
                    key:'1-0'
                },
                {
                    name:'图书更新',
                    path:'/admin/books/update',
                    key:'1-1'
                }
            ]
        },
        {
        name:'广告位管理',
        key:'2',
        path:'/admin/banner'
        },
        {
        name:'用户管理',
        key:'3',
        path:'/admin/user'
        }
    ]
  }
export default obj