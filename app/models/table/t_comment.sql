# 评论表
create table if not exists t_comment( 
  id int unsigned auto_increment,
  article_id int,
  user_id int,
  to_user int default null,
  content varchar(20) default null,
  primary key (id)
 ) default charset = utf8;

commit;