
package com.sttt.ruby.controller;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonResController {

	/**
	 * Create captcha image
	 * @param request Request
	 * @return Captcha image
	 * @throws ServletException ServletException
	 * @throws IOException IOException
	 */
	@RequestMapping(value = "/account/captcha", method = RequestMethod.GET)
	public String createCaptcha(HttpServletRequest request) throws ServletException, IOException {
		String sessionKey = request.getParameter("screenId");
		int iTotalChars = 6;
		int iHeight = 27;
		int iWidth = 92;
		Font fntStyle1 = new Font("Arial", Font.BOLD, 20);
		Random randChars = new Random();
		String sImageCode = (Long.toString(Math.abs(randChars.nextLong()), 36)).substring(0, iTotalChars);
		BufferedImage biImage = new BufferedImage(iWidth, iHeight, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2dImage = (Graphics2D) biImage.getGraphics();
		int iCircle = 15;
		for (int i = 0; i < iCircle; i++) {
			g2dImage.setColor(new Color(randChars.nextInt(255), randChars.nextInt(255), randChars.nextInt(255)));
		}
		g2dImage.setFont(fntStyle1);
		for (int i = 0; i < iTotalChars; i++) {
			g2dImage.setColor(new Color(randChars.nextInt(255), randChars.nextInt(255), randChars.nextInt(255)));
			if (i % 2 == 0) {
				g2dImage.drawString(sImageCode.substring(i, i + 1), 15 * i, 18);
			} else {
				g2dImage.drawString(sImageCode.substring(i, i + 1), 15 * i, 23);
			}
		}
		java.io.ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(biImage, "jpeg", bos);
		g2dImage.dispose();
		HttpSession session = request.getSession();
		session.setAttribute(sessionKey, sImageCode);

		return Base64.getEncoder().encodeToString(bos.toByteArray());
	}
}
