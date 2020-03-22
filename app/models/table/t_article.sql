# 朋友圈表
create table t_article( 
  id int unsigned auto_increment,
  user_id int,
  title varchar(16),  
  content text,
  create_at datetime,
  primary key (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
commit;