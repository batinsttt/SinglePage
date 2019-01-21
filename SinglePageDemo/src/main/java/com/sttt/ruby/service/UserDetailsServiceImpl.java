package com.sttt.ruby.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sttt.ruby.entity.AppUser;
import com.sttt.ruby.repository.AppRoleRepository;
import com.sttt.ruby.repository.AppUserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private AppUserRepository appUserRepository;
	
	@Autowired
	private AppRoleRepository appRoleRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserRepository.findUserAccount(username);
		if(appUser == null) {
			throw new UsernameNotFoundException("Not found username");
		}
		List<String> roles = appRoleRepository.getRoleNames(appUser.getUserId());
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		for(Iterator<String> role = roles.iterator();role.hasNext();) {
			GrantedAuthority authority = new SimpleGrantedAuthority(role.next());
			grantedAuthorities.add(authority);
		}
		
		UserDetails userDetails = new User(appUser.getUserName(), appUser.getEncrytedPassword(), grantedAuthorities);
		return userDetails;
	}
	
	
}
