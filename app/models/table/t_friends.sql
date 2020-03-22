# 朋友表
create table if not exists t_friends( 
  id INT UNSIGNED AUTO_INCREMENT,
  user_id int,
  friend_id int,
  PRIMARY KEY(id)
 ) default charset = utf8;

commit;