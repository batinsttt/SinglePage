<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<div class="box box-danger padding-15">
		<div class="row menu-service">
			<div class="col-xs-3 cus-channel-header">
				<a href="#/channel" class="tctt"> 
					<span><i class="fa fa-search"></i></span><br> 
					<span>Tra cứu thông tin</span>
				</a>
			</div>
			<div class="col-xs-3 cus-channel-header">
				<a href="#/problem" class="bldv"> 
					<span><i class="fa fa-exclamation-triangle"></i></span><br>
					<span>Báo lỗi dịch vụ</span>
				</a>
			</div>
			<div class="col-xs-3 cus-channel-header">
				<a href="#/ticket/tickets" class="qlyc">
					<span><i class="fa fa-list"></i></span><br> 
					<span>Quản lý yêu cầu</span>
				</a>
			</div>
			<div class="col-xs-3 cus-channel-header">
				<a href="#" class="hddt"> 
					<span><i class="fa fa-newspaper-o"></i></span><br>
					<span>Hóa đơn điện tử</span>
				</a>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	$(document).ready(function() {
// 		 $('.menu-service .init').addClass("active");
		$('.menu-service a').each(function(){
			$(this).bind('click',function(){
				var element = document.querySelectorAll('.menu-service .active');
				if(element != null && element.length > 0) {
					[].forEach.call(element, function(el) {
						el.classList.remove('active');
					});
				}
				$(this).addClass("active");
			});
		});
 });
</script>