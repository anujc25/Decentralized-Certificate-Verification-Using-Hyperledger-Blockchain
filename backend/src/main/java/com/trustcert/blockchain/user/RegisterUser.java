/****************************************************** 
 *  Copyright 2018 IBM Corporation 
 *  Licensed under the Apache License, Version 2.0 (the "License"); 
 *  you may not use this file except in compliance with the License. 
 *  You may obtain a copy of the License at 
 *  http://www.apache.org/licenses/LICENSE-2.0 
 *  Unless required by applicable law or agreed to in writing, software 
 *  distributed under the License is distributed on an "AS IS" BASIS, 
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 *  See the License for the specific language governing permissions and 
 *  limitations under the License.
 */
package com.trustcert.blockchain.user;

import com.trustcert.blockchain.client.CAClient;
import com.trustcert.blockchain.config.Config;
import com.trustcert.blockchain.util.Util;
import com.trustcert.model.UserRolesEnum;

public class RegisterUser {

	public String registerUser(String primaryEmailId, UserRolesEnum role) {
		try {
			Util.cleanUp();
			String caUrl = Config.CA_ORG1_URL;
			CAClient caClient = new CAClient(caUrl, null);
			// Enroll Admin to Org1MSP
			UserContext adminUserContext = new UserContext();
			adminUserContext.setName(Config.ADMIN);
			adminUserContext.setAffiliation(Config.ORG1);
			adminUserContext.setMspId(Config.ORG1_MSP);
			caClient.setAdminUserContext(adminUserContext);
			adminUserContext = caClient.enrollAdminUser(Config.ADMIN, Config.ADMIN_PASSWORD);

			// Register and Enroll user to Org1MSP
			UserContext userContext = new UserContext();
			userContext.setName(primaryEmailId);
			userContext.setAffiliation(Config.ORG1);
			userContext.setMspId(Config.ORG1_MSP);

			String eSecret = caClient.registerUserCAClientWrapper(primaryEmailId, Config.ORG1, role);
			System.out.println("Successfully Registered User: " + primaryEmailId + eSecret);
			return eSecret;
//			userContext = caClient.enrollUser(userContext, eSecret);

		} catch (Exception e) {
			System.out.println("Registration failed for User: " + primaryEmailId);
			e.printStackTrace();
		}
		return null;
	}

}