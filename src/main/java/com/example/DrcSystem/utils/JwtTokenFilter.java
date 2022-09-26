package com.example.DrcSystem.utils;

import com.example.DrcSystem.constants.ApplicationURLConstants;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

	@Autowired
	private TokenUtil tokenUtil;

	@Autowired
	private ServiceRegistry serviceRegistry;

	@Autowired
	@Qualifier("handlerExceptionResolver")
	private HandlerExceptionResolver resolver;

	@Override
	protected void doFilterInternal(final HttpServletRequest request,
			final HttpServletResponse response, final FilterChain filterChain)
			throws ServletException, IOException {

		try {
			
			if (tokenUtil == null) {
				final ServletContext servletContext = request.getServletContext();
				final WebApplicationContext webApplicationContext = WebApplicationContextUtils
						.getWebApplicationContext(servletContext);
				tokenUtil = webApplicationContext.getBean(TokenUtil.class);
			}

			if (serviceRegistry == null) {
				final ServletContext servletContext = request.getServletContext();
				final WebApplicationContext webApplicationContext = WebApplicationContextUtils
						.getWebApplicationContext(servletContext);
				serviceRegistry = webApplicationContext.getBean(ServiceRegistry.class);
			}


			filterChain.doFilter(request, response);
			
		}catch(Exception e ) {
			resolver.resolveException(request, response, null, e);
		}
		
	}

	@Override
	protected boolean shouldNotFilter(final HttpServletRequest request)
			throws ServletException {
		final String path = request.getServletPath();

		return path.equals(ApplicationURLConstants.DOCTOR + ApplicationURLConstants.LOGIN)
				|| path.equals(ApplicationURLConstants.PATIENT + ApplicationURLConstants.LOGIN);
	}

	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

}