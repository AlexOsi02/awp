package org.osipov.servlet;

import org.osipov.dao.UserDB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/core/users")
public class UserListServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.setAttribute("users", UserDB.findAll());
    req.getRequestDispatcher("/jsp/v1/users.jsp").forward(req, resp);
  }
}
