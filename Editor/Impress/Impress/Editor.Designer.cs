namespace Impress
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(frmMain));
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnGoUrl = new System.Windows.Forms.Button();
            this.urlBar = new System.Windows.Forms.TextBox();
            this.btnDevTools = new System.Windows.Forms.Button();
            this.btnRefresh = new System.Windows.Forms.Button();
            this.panel2 = new System.Windows.Forms.Panel();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.SystemColors.ActiveBorder;
            this.panel1.Controls.Add(this.btnGoUrl);
            this.panel1.Controls.Add(this.urlBar);
            this.panel1.Controls.Add(this.btnDevTools);
            this.panel1.Controls.Add(this.btnRefresh);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1340, 32);
            this.panel1.TabIndex = 0;
            // 
            // btnGoUrl
            // 
            this.btnGoUrl.Location = new System.Drawing.Point(641, 1);
            this.btnGoUrl.Name = "btnGoUrl";
            this.btnGoUrl.Size = new System.Drawing.Size(75, 23);
            this.btnGoUrl.TabIndex = 3;
            this.btnGoUrl.Text = "button1";
            this.btnGoUrl.UseVisualStyleBackColor = true;
            this.btnGoUrl.Click += new System.EventHandler(this.btnGoUrl_Click);
            // 
            // urlBar
            // 
            this.urlBar.Location = new System.Drawing.Point(175, 4);
            this.urlBar.Name = "urlBar";
            this.urlBar.Size = new System.Drawing.Size(460, 20);
            this.urlBar.TabIndex = 2;
            // 
            // btnDevTools
            // 
            this.btnDevTools.Location = new System.Drawing.Point(93, 3);
            this.btnDevTools.Name = "btnDevTools";
            this.btnDevTools.Size = new System.Drawing.Size(75, 23);
            this.btnDevTools.TabIndex = 1;
            this.btnDevTools.Text = "Dev tools";
            this.btnDevTools.UseVisualStyleBackColor = true;
            this.btnDevTools.Click += new System.EventHandler(this.btnDevTools_Click);
            // 
            // btnRefresh
            // 
            this.btnRefresh.Location = new System.Drawing.Point(12, 3);
            this.btnRefresh.Name = "btnRefresh";
            this.btnRefresh.Size = new System.Drawing.Size(75, 23);
            this.btnRefresh.TabIndex = 0;
            this.btnRefresh.Text = "Refresh";
            this.btnRefresh.UseVisualStyleBackColor = true;
            this.btnRefresh.Click += new System.EventHandler(this.btnRefresh_Click);
            // 
            // panel2
            // 
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(0, 32);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1340, 656);
            this.panel2.TabIndex = 1;
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.ClientSize = new System.Drawing.Size(1340, 688);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.panel1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.KeyPreview = true;
            this.Name = "frmMain";
            this.Text = "Impress";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button btnRefresh;
        private System.Windows.Forms.Button btnDevTools;
        private System.Windows.Forms.Button btnGoUrl;
        private System.Windows.Forms.TextBox urlBar;
    }
}

