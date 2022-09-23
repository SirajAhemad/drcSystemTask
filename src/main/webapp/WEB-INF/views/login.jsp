<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
        <meta name="author" content="Coderthemes">

        <link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/images/favicon.png">

        <title>OncoCare | Admin Login</title>

        <link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="${pageContext.request.contextPath}/resources/css/core.css" rel="stylesheet" type="text/css" />
        <link href="${pageContext.request.contextPath}/resources/css/components.css" rel="stylesheet" type="text/css" />
        <link href="${pageContext.request.contextPath}/resources/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="${pageContext.request.contextPath}/resources/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="${pageContext.request.contextPath}/resources/css/responsive.css" rel="stylesheet" type="text/css" />

        <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

        <script src="${pageContext.request.contextPath}/resources/js/modernizr.min.js"></script>
        
    </head>
    <body>

        <div class="account-pages"></div>
        <div class="clearfix"></div>
        <div class="wrapper-page">
        	<div class=" card-box">
            <div class="panel-heading"> 
            	<center>
            		<img src="${pageContext.request.contextPath}/resources/images/app-icon.png" style="height:90px;width:90px">
           		</center> 
                <h3 class="text-center"> Sign In to <strong class="text-custom">OncoCare</strong> </h3>
            </div> 


            <div class="panel-body">
            <form class="form-horizontal m-t-20" action="${pageContext.request.contextPath }/authenticate" method="post">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                	<c:if test="${pageContext.request.queryString == 'logout'}">
                		<div class="alert alert-success center text-center">
							<label>Logged Out Successfully !!!</label>
						</div>
                	</c:if>
                	<c:if test="${pageContext.request.queryString == 'error'}">
                		<div class="alert alert-danger text-center center">
							<label>Invalid Email ID or Password !!!</label>
						</div>
                	</c:if>
                <div class="form-group ">
                    <div class="col-xs-12">
                        <input type="email" name="username"
                               data-parsley-required-message="Email Id is required"
                               parsley-trigger="change" required placeholder="Email Id"
                               class="form-control" data-parsley-id="4">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-xs-12">
                        <input type="password" name="password" parsley-trigger="change"
                               data-parsley-required-message="Password is required" required
                               placeholder="Password" class="form-control" data-parsley-id="4">
                    </div>
                </div>

                <div class="form-group text-center m-t-40">
                    <div class="col-xs-12">
                        <button class="btn btn-default btn-block text-uppercase waves-effect waves-light custom-background"
                                type="submit">Log In
                        </button>
                    </div>
                </div>
			</form> 
            
            </div>   
            </div>                              
        </div>
        

        <!-- jQuery  -->
        <script src="${pageContext.request.contextPath}/resources/js/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/detect.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/fastclick.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.slimscroll.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.blockUI.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/waves.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/wow.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.nicescroll.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.scrollTo.min.js"></script>
        <script src="${pageContext.request.contextPath}/resources/plugins/parsleyjs/dist/parsley.min.js" type="text/javascript"></script>


        <script src="${pageContext.request.contextPath}/resources/js/jquery.core.js"></script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.app.js"></script>
        
        <script>
            var resizefunc = [];
            $(document).ready(function () {
                $('form').parsley();
            });
        </script>
	
	</body>
</html>